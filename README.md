# NexAd

![NexAd Hero Image](/imgs/hero.png)

## Project Overview

**NexAd** is a framework designed for a CPA (Cost-Per-Action) and watch-to-earn platform, where users can earn **Pepe** tokens by watching advertisements and completing surveys. Users can also claim free Pepe tokens through an on-site faucet. Additionally, NexAd allows advertisers to host their own ads by paying in Pepe tokens, which are then distributed to users as rewards.

This project provides a fully functional example of integrating crypto payments with a web advertising service. Whether you're looking to build a crypto-driven advertising platform or explore web development with blockchain integration, NexAd serves as a solid foundation.

---

## Features

- **Watch-to-Earn:** Users earn Pepe tokens by watching ads or completing surveys.
- **Crypto Faucet:** Users can claim free Pepe tokens through a built-in faucet.
- **Advert Hosting:** Advertisers can create ads, set budgets, and pay with Pepe tokens, which are distributed to users.
- **User Authentication:** Secure login, sign-up, and email verification.
- **PepeCLI Wallet Integration:** Full integration for crypto transactions using Pepe tokens.

---

## Tech Stack

NexAd is built using the following technologies:

- **Frontend:** [React](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/) for responsive UI development.
- **Backend:** [Node.js](https://nodejs.org/) for server-side logic and APIs.
- **Wallet Integration:** [PepeCLI Wallet](https://pepecoin.org/) for handling cryptocurrency transactions.
- **Email Handling:** [MailTrap](https://mailtrap.io/) for development email testing.

---

## Screenshots

### Dashboard
![NexAd Dashboard](/imgs/dashboard.png)

### Advertisements
![NexAd Advertisements](/imgs/advertisments.png)

### Faucet
![NexAd Faucet](/imgs/faucet.png)

### Advertiser Interface
![Create Advertisement](/imgs/advertise.png)

---

## Installation

### Backend & Frontend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file in the `backend` directory. The backend uses environment variables for configuration. Your `.env` file should look like this:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<app_name>
   PORT=5000
   JWT_SECRET=yourJWTSecretKey
   NODE_ENV=production

   MAILTRAP_TOKEN=yourMailTrapToken

   CAPTCHA_SECRET=yourHCaptchaSecret

   CLIENT_URL=http://localhost:5173
   ```

   > **Note:** Replace `<username>`, `<password>`, `<cluster>`, `<db_name>`, and `<app_name>` with your actual MongoDB connection details. Replace other values with your secret keys.

3. Run the build script, which will install the necessary dependencies for both the backend and the frontend. This will also build the frontend into the production-ready `dist` folder.
   ```bash
   npm run build
   ```

4. To run the backend and serve the frontend in **production mode**:
   ```bash
   npm run start
   ```

   This will launch both the backend server and serve the pre-built frontend from the `dist` folder.

5. For **development mode** (backend only), run:
   ```bash
   npm run dev
   ```
   > **Note:** The development mode runs only the backend. You will need to run the frontend separately in development mode (see below).

### Frontend Development Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```
   > **Note:** Only do this if you havent already ran the backends build script.
3. Run the frontend in development mode:
   ```bash
   npm run dev
   ```

This will launch the frontend on its own development server, typically at `http://localhost:5000`. You'll need to ensure the backend is also running (either in dev or prod mode) to test the full application.

---

## API Endpoints

### Crypto Endpoints

- **Faucet Claim:**
  - `POST /api/crypto/faucet`
  - Request Body:
    ```js
    {
      wallet: "wallet_address",
      token: "hCaptcha_token"
    }
    ```
  - Response: 1 to 20 Pepe payout.

- **Faucet Dashboard (Requires Authentication):**
  - `POST /api/crypto/faucet-dashboard`
  - Request Body:
    ```js
    {
      wallet: "wallet_address"
    }
    ```
  - Response: 1 to 120 Pepe payout.

### Advertisement Endpoints

- **Create an Advertisement (Requires Authentication):**
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
  - Total ad cost is calculated as `viewers * payout`.

- **List All Advertisements (Requires Authentication):**
  - `GET /api/crypto/adverts`

- **Get Specific Advertisement (Requires Authentication):**
  - `GET /api/crypto/advert/:id`
  - Request Parameters:
    ```js
    { id: "advert_id" }
    ```

### Authentication Endpoints

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

## Contributing

We welcome contributions to NexAd! Feel free to fork the repository and submit a pull request with your changes or improvements. Make sure to follow our [contribution guidelines](CONTRIBUTING.md) (coming soon) before submitting any PRs.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

If you have any questions or issues, feel free to open an issue on GitHub or contact the project maintainers.

--- 

### Happy Earnings with NexAd! 🎉
