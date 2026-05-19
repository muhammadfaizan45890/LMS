import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

import "../src/index.css";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import AuthSuccess from "./pages/AuthSuccess";
import NotFound from "./pages/NotFound";

/* ================= COMMON ================= */
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* ================= USER ================= */
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserSidebar from "./pages/user/UserSidebar";
import ActiveCourses from "./pages/user/ActiveCourses";
import Video from "./pages/user/Video";

/* ================= ADMIN ================= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSidebar from "./pages/admin/AdminSidebar";
import AdminModules from "./pages/admin/AdminModules";
import LMSGuide from "./pages/user/LMSGuide";
import RefundRequest from "./pages/user/RefundRequest";
import ApplyCertificate from "./pages/user/ApplyCertificate";
import AdminRefund from "./pages/admin/AdminRefund";
import About from "./pages/user/About";
import Notes from "./pages/user/Notes";
import AdminNotes from "./pages/admin/AdminNotes";

/* ================= MAIN LAYOUT ================= */
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

/* ================= USER LAYOUT ================= */
const UserLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Navbar />

      <div className="flex pt-14">
        <UserSidebar />

        <main className="flex-1 min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ================= ADMIN LAYOUT ================= */
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Navbar />

      <div className="flex pt-14">
        <AdminSidebar />

        <main className="flex-1 min-h-screen overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ================= ROUTER ================= */
const router = createBrowserRouter([
  /* ================= PUBLIC ================= */
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/verify", element: <VerifyEmail /> },
      { path: "/verify/:token", element: <Verify /> },
      { path: "/auth-success", element: <AuthSuccess /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp/:email", element: <VerifyOTP /> },
      { path: "/change-password/:email", element: <ChangePassword /> },
      { path: "*", element: <NotFound /> },
        // ✅ ABOUT PAGE ADDED
  { path: "/about", element: <About /> },
    ]
  },

  /* ================= USER ROUTES ================= */
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "profile", element: <UserProfile /> },
      { path: "active-courses", element: <ActiveCourses /> },
      { path: "notes", element: <Notes /> },
      { path: "guide", element: <LMSGuide /> },
      { path: "apply-refund", element: <RefundRequest /> },
      { path: "certificate", element: <ApplyCertificate /> },




      // ✅ VIDEO PAGE FIXED HERE
      { path: "video", element: <Video /> }
    ]
  },

  /* ================= ADMIN ROUTES ================= */
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },

      { path: "dashboard", element: <AdminDashboard /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "modules", element: <AdminModules /> },
      { path: "refund", element: <AdminRefund /> },
      { path: "notes", element: <AdminNotes /> },
      { path: "users", element: <AdminUsers /> }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;