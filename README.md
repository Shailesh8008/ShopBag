# 🛍️ ShopBag – MERN E-Commerce Application

ShopBag is a full-stack **MERN e-commerce platform** featuring a **customer-facing store** and a **dedicated admin panel** for managing products, users, and orders.

🚀 **Live Demo:**  
👉 [https://shopbag0.netlify.app](https://shopbag0.netlify.app)

---

## 🧰 Tech Stack

### Frontend

- React (vite)
- Redux Toolkit
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas and ImageKit

---

## ✨ Features

- User authentication (Login / Register)
- Role-based Authorization (Admin / User)
- Product listing & details
- Cart & checkout flow
- Secure REST APIs
- Environment-based configuration
- Fully responsive UI (except admin panel)

---

## 📦 Installation & Setup (Local)

Follow these steps to run **ShopBag** on your local system.

---

### 1️⃣ Clone the Repository

Terminal

```bash
git clone https://github.com/Shailesh8008/ShopBag.git
cd shopbag
```

### 2️⃣ Setup Backend

Terminal

```bash
cd backend
npm install
```

Create .env file in backend directory and write your own credentials
You can choose *dev* for development and *prod* for production for **ENV** variable

```bash
DB=your_connection_string
SMTP_PASS=google_app_password
JWT_SECRET_KEY=any_random_digits
RAZORPAY_ID=your_razorpay_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
ADMIN_PASS=any_password_to_access_admin_panel
IMAGEKIT_ENDPOINT=your_imagekit_endpoint_url
IMAGEKIT_PUBLIC_KEY=_your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
ENV=dev
FRONTEND_URL=http://localhost:5173
```

Terminal

```bash
npm run server
```

Backend will be running at: [http://localhost:5000](http://localhost:5000)

### 3️⃣ Setup Frontend

Open a new terminal and navigate to frontend directory then install dependencies

```bash
cd frontend
npm install
```

Create .env file in frontend directory and fill required credentials
Just fill your razorpay_id, created while setting up backend

```bash
VITE_RAZORPAY_ID=your_razorpay_id_same_as_backend
VITE_BACKEND_URL=http://localhost:5000
```

Terminal

```bash
npm run dev
```

Frontend will be running at: [http://localhost:5173](http://localhost:5173)
