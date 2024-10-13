# 🚀 **NexAd**

![NexAd Hero Image](/imgs/hero.png)

## 📖 Project Overview

**NexAd** is a CPA (Cost-Per-Action) and watch-to-earn platform where users can earn **Pepe** tokens 🐸 by watching advertisements 📺 and completing surveys 📝. Users can also claim free Pepe tokens via an on-site faucet 💧. Advertisers can host their ads by paying in Pepe tokens, which are then distributed as rewards 🎁.

This project is a complete example of integrating crypto payments 💸 with web advertising services. Whether you're aiming to build a crypto-driven advertising platform or explore web development with blockchain integration, **NexAd** provides a solid foundation 🛠️.

---

## 🌟 Features

- **Watch-to-Earn:** Users earn Pepe tokens 🐸 by watching ads 🎥 or completing surveys 📝.
- **Crypto Faucet:** Claim free Pepe tokens 💰 through a built-in faucet 💧.
- **Advert Hosting:** Advertisers can create ads, set budgets, and pay in Pepe tokens 🔥.
- **User Authentication:** Secure login 🔐, sign-up 📝, and email verification 📧.
- **PepeCLI Wallet Integration:** Full integration for crypto transactions using Pepe tokens 💳.

---

## 🛠️ Tech Stack

NexAd is built using the following technologies:

| **Technology**   | **Description**                           | **Icon**  |
|------------------|-------------------------------------------|-----------|
| **Frontend**      | [React](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/) for responsive UI development. | ![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Backend**       | [Node.js](https://nodejs.org/) for server-side logic and APIs. | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) |
| **Wallet Integration** | [PepeCLI Wallet](https://pepecoin.org/) for handling cryptocurrency transactions. | ![Pepe](https://img.shields.io/badge/-PepeCLI-34c759?style=for-the-badge&logo=blockchain&logoColor=white) |
| **Email Handling** | [MailTrap](https://mailtrap.io/) for development email testing. | ![MailTrap](https://img.shields.io/badge/-MailTrap-1F1F1F?style=for-the-badge&logoColor=white) |

---

## 📸 Screenshots

### 🖥️ Dashboard
![NexAd Dashboard](/imgs/dashboard.png)

### 📊 Advertisements
![NexAd Advertisements](/imgs/advertisments.png)

### 💧 Faucet
![NexAd Faucet](/imgs/faucet.png)

### 💼 Advertiser Interface
![Create Advertisement](/imgs/advertise.png)

---

## ⚙️ Installation

### Backend & Frontend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file in the `backend` directory. Your `.env` file should look like this:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<app_name>
   PORT=5000
   JWT_SECRET=yourJWTSecretKey
   NODE_ENV=production
   MAILTRAP_TOKEN=yourMailTrapToken
   CAPTCHA_SECRET=yourHCaptchaSecret
   CLIENT_URL=http://localhost:5173
   ```

3. Run the build script 🛠️:
   ```bash
   npm run build
   ```

4. To run the backend and serve the frontend in **production mode** 🚀:
   ```bash
   npm run start
   ```

5. For **development mode** (backend only) 👨‍💻, run:
   ```bash
   npm run dev
   ```

### Frontend Development Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies 📦:
   ```bash
   npm install
   ```

3. Run the frontend in **development mode** 🌐:
   ```bash
   npm run dev
   ```

---

## 🛡️ API Endpoints

### 💸 Crypto Endpoints

- **Faucet Claim:**
  - `POST /api/crypto/faucet`
  - Request Body:
    ```js
    {
      wallet: "wallet_address",
      token: "hCaptcha_token"
    }
    ```

- **Faucet Dashboard:**
  - `POST /api/crypto/faucet-dashboard`
  - Request Body:
    ```js
    {
      wallet: "wallet_address"
    }
    ```

### 📢 Advertisement Endpoints

- **Create an Advertisement:**
  - `POST /api/crypto/create-advert`
  - Request Body:
    ```js
    {
      name: "ad_name",
      description: "ad_description",
      url: "ad_image_url",
      payout: "pepe_per_view",
      viewers: "desired_viewer_count",
      duration: "ad_duration"
    }
    ```

### 🔐 Authentication Endpoints

- **Check Authentication Status:**
  - `GET /api/auth/check-auth`

- **Sign Up:**
  - `POST /api/auth/signup`
  - Request Body:
    ```js
    {
      email: "user_email",
      password: "user_password",
      name: "user_name"
    }
    ```

- **Log In:**
  - `POST /api/auth/login`
  - Request Body:
    ```js
    {
      email: "user_email",
      password: "user_password"
    }
    ```

- **Log Out:**
  - `POST /api/auth/logout`

- **Email Verification:**
  - `POST /api/auth/verify-email`
  - Request Body:
    ```js
    { code: "verification_code" }
    ```

- **Forgot Password:**
  - `POST /api/auth/forgot-password`
  - Request Body:
    ```js
    { email: "user_email" }
    ```

- **Reset Password:**
  - `POST /api/auth/reset-password/:token`
  - Request Parameters:
    ```js
    { token: "reset_token" }
    ```
  - Request Body:
    ```js
    { password: "new_password" }
    ```

---

## 📬 Contact

For any questions or issues, feel free to open an issue on GitHub 🐙 or contact the project maintainers 👨‍💻.

---

### 🎉 **Happy Earnings with NexAd!** 🤑
