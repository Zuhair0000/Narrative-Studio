const { client, paypal } = require("../utils/paypal");
const db = require("../db");

exports.paypalPayment = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "2.00",
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
  }
};

exports.captureOrder = async (req, res) => {
  const { orderId } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);

    const userId = req.user.id;
    await db.query("UPDATE users SET credits = credits + 10 WHERE id = ?", [
      userId,
    ]);

    res.json({
      success: true,
      message: "Payment successful",
      creditsAdded: 10,
    });
  } catch (err) {
    console.error(err);
  }
};
