🧠 Narrative Studio – AI Story Generator

Narrative Studio is a full-stack AI-powered story generation platform that allows users to create unique and creative stories using OpenAI’s GPT models.
Users can log in, generate stories using AI, and manage their usage through a credit-based system. The platform integrates PayPal payments to allow users to purchase additional credits securely.

⸻

🚀 Features

🧩 Core Features
	•	AI Story Generation – Generate creative stories powered by OpenAI API.
	•	Credit-Based System – Each generation deducts credits; users can buy more anytime.
	•	Secure Authentication – JSON Web Token (JWT) authentication system.
	•	PayPal Integration – Fully functional PayPal payment system for buying credits.
	•	User Dashboard – View your stories and remaining credits in real time.
	•	Responsive Design – Optimized for both desktop and mobile devices.

⸻

🛠️ Tech Stack

Frontend
	•	React.js
	•	Tailwind CSS
	•	PayPal JavaScript SDK

Backend
	•	Node.js
	•	Express.js
	•	MySQL
	•	JWT Authentication
	•	OpenAI API

⸻

💳 Payment Integration

Narrative Studio uses PayPal’s REST API for secure credit purchases.
	•	Users can buy 10 credits for $2 USD.
	•	Payments are processed in live or sandbox mode depending on configuration.
	•	Credits update automatically after successful transactions.

⸻

🧰 Project Structure

Narrative-Studio/
│
├── backend/
│   ├── controllers/
│   │   ├── storyController.js
│   │   ├── paymentController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── storyRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── paypal.js
│   ├── db.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Button.jsx
│   │   │   └── StoryCard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BuyCredits.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   └── Login.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md


⸻

⚙️ Setup & Installation

1️⃣ Clone the repository

git clone https://github.com/Zuhair0000/Narrative-Studio.git
cd Narrative-Studio

2️⃣ Backend setup

cd backend
npm install

Create a .env file in the backend folder:

PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=narrative_studio
JWT_SECRET=yourjwtsecret
OPENAI_API_KEY=your_openai_api_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

Run the backend server:

npm run dev

3️⃣ Frontend setup

cd ../frontend
npm install
npm run dev


⸻

🧠 How It Works
	1.	Users sign up and receive a starting number of free credits.
	2.	Each AI story generation deducts 1 credit.
	3.	If credits run out, users can buy more using PayPal.
	4.	After successful payment, credits are instantly updated in their account.
	5.	Users can view all their generated stories on their dashboard.

⸻

🖼️ Screenshots

- Main Page:
  <img width="1693" height="875" alt="Screenshot 2025-10-17 at 9 17 21 PM" src="https://github.com/user-attachments/assets/26b15f76-6721-435e-882e-6800f307b847" />

- Login Page:
  <img width="1691" height="855" alt="Screenshot 2025-10-17 at 9 18 10 PM" src="https://github.com/user-attachments/assets/5a78cf8d-9e8c-4e49-a0ff-2d854e1a03e3" />

- Sign-up Page:
  <img width="1689" height="881" alt="Screenshot 2025-10-17 at 9 18 51 PM" src="https://github.com/user-attachments/assets/46f2abd2-04ab-4dac-a6b1-87c22acd7801" />

- Dashboard:
  <img width="1682" height="872" alt="Screenshot 2025-10-17 at 9 20 05 PM" src="https://github.com/user-attachments/assets/b1e56be2-f3eb-498e-b261-1357690a7cbe" />

- Create Story Page:
  <img width="1679" height="919" alt="Screenshot 2025-10-17 at 9 20 54 PM" src="https://github.com/user-attachments/assets/384bbb07-c34a-4a39-9676-d337d5a2c920" />

- Stories Page:
  <img width="1680" height="519" alt="Screenshot 2025-10-17 at 9 21 38 PM" src="https://github.com/user-attachments/assets/6ace1a2d-6c5c-47fe-8a6e-43ed887d08af" />

- Buy Credits Page:
  <img width="1684" height="743" alt="Screenshot 2025-10-17 at 9 22 36 PM" src="https://github.com/user-attachments/assets/8582ad9d-fc74-43fe-9518-60f10534f847" />

⸻

🔒 Security
	•	JWT-based authentication ensures safe access to user data.
	•	Payment processing is handled securely via PayPal.
	•	No sensitive data (like card info) is stored on the server.

⸻

🌍 Future Improvements
	•	Add Google and Apple login options.
	•	Introduce story categories (sci-fi, romance, horror, etc.).
	•	Implement story sharing and community features.
	•	Allow users to generate images for stories using DALL·E or similar APIs.

⸻

👨‍💻 Author

Zuhair Hassan
📍 Software Engineer | Full Stack Developer


⸻

🪄 License

This project is licensed under the MIT License — feel free to use and modify it.
