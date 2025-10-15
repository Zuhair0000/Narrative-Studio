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
        description: "10 AI story credits",
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create PayPal order" });
  }
};

exports.captureOrder = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return req
      .status(400)
      .json({ success: false, message: "Missing order ID" });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);

    const status = capture.result.status;
    if (status !== "COMPLETED") {
      console.warn("Payment not completed:", status);
      return res.status(400).json({
        success: false,
        message: `Payment not completed (status: ${status})`,
      });
    }

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
