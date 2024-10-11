import { Navigate, Route, Routes } from "react-router-dom";

import HeroPage from "./pages/HeroPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage";

import LoadingSpinner from "./components/LoadingSpinner";


import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated,user  } = useAuthStore();

  useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;


  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden font-main">
      <div class="absolute inset-0 h-full w-full bg-stone-950 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      <div className="absolute top-0 right-0 rounded-full w-[700px] h-[700px] bg-green-500 opacity-20 blur-3xl translate-x-1/3 -translate-y-1/3 z-0"></div>

      <Routes>
        <Route path='/'  element={<HeroPage/>} />
        <Route path='/dashboard/*'  element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
        <Route path='/signup'  element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>} />
        <Route path='/login'  element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>} />
        <Route path='/verify-email'  element={<RedirectAuthenticatedUser><EmailVerificationPage/></RedirectAuthenticatedUser>} />
        <Route path='/forgot-password'  element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token'  element={<RedirectAuthenticatedUser><ResetPasswordPage/></RedirectAuthenticatedUser>} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App