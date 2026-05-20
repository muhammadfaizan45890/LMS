import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import API from "../config/api.js";

import {
  BookA,
  LogOut,
  User,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  Home
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'

import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {

  const { user, setUser } = getData()

  const navigate = useNavigate()
  const location = useLocation()

  const accessToken = localStorage.getItem("accessToken")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ================= CHECK CURRENT PANEL =================
  const isAdminPanel = location.pathname.startsWith("/admin")
  const isUserPanel = location.pathname.startsWith("/user")

  // ================= SCROLL EFFECT =================
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  // ================= CLOSE MOBILE MENU ON ROUTE CHANGE =================
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // ================= LOGOUT =================
  const logoutHandler = async () => {

    try {

      const res = await axios.post(
        `${API}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {

        setUser(null)

        localStorage.clear()

        toast.success(res.data.message || "Logged out successfully!")

        navigate("/login")
      }

    } catch {
      toast.error("Logout failed!")
    }
  }

  // ================= DASHBOARD ROUTE =================
  const dashboardRoute =
    user?.role === "admin"
      ? "/admin/dashboard"
      : "/user/dashboard"

  // ================= PROFILE ROUTE =================
  const profileRoute =
    user?.role === "admin"
      ? "/admin/profile"
      : "/user/profile"

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[500]
        transition-all duration-300

        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b"
            : "bg-white border-b"
        }
      `}
    >

      {/* ================= CONTAINER ================= */}
      <div
        className="
          h-14
          px-4 sm:px-6 lg:px-8
          flex items-center justify-between
        "
      >

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >

            <div
              className="
                bg-black text-white
                p-2 rounded-xl
                group-hover:scale-105
                transition
              "
            >
              <ShieldCheck size={18} />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-bold text-black text-lg leading-none">
                Learning
              </h1>

              <p className="text-[10px] text-zinc-500">
                Management System
              </p>
            </div>
          </Link>

          {/* PANEL BADGE */}
          {(isAdminPanel || isUserPanel) && (
            <div
              className={`
                hidden md:flex
                items-center gap-2
                px-3 py-1 rounded-full
                text-xs font-medium

                ${
                  isAdminPanel
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >

              <LayoutDashboard size={14} />

              {isAdminPanel
                ? "Admin Panel"
                : "User Panel"}
            </div>
          )}
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-5">

          {/* HOME */}
          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              text-zinc-700 hover:text-black
              transition font-medium
            "
          >
            <Home size={18} />
            Home
          </button>

          {user ? (

            <DropdownMenu>

              {/* AVATAR */}
              <DropdownMenuTrigger>

                <Avatar
                  className="
                    cursor-pointer
                    ring-2 ring-zinc-200
                    hover:ring-black
                    transition-all duration-300
                  "
                >

                  <AvatarImage src={user?.avatar} />

                  <AvatarFallback className="bg-black text-white">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>

                </Avatar>

              </DropdownMenuTrigger>

              {/* DROPDOWN */}
              <DropdownMenuContent
                align="end"
                className="
                  w-60 rounded-2xl
                  border bg-white shadow-xl
                  p-2
                  mt-3
                "
              >

                <DropdownMenuLabel className="pb-3">

                  <div className="flex items-center gap-3">

                    <Avatar className="h-10 w-10">

                      <AvatarImage src={user?.avatar} />

                      <AvatarFallback className="bg-black text-white">
                        {user?.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>

                    </Avatar>

                    <div>
                      <h1 className="font-semibold text-black">
                        {user?.username}
                      </h1>

                      <p className="text-xs text-zinc-500 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* DASHBOARD */}
                <DropdownMenuItem
                  onClick={() => navigate(dashboardRoute)}
                  className="cursor-pointer rounded-xl py-3"
                >

                  <LayoutDashboard className="mr-2 h-4 w-4" />

                  {
                    user?.role === "admin"
                      ? "Admin Dashboard"
                      : "User Dashboard"
                  }

                </DropdownMenuItem>

                {/* PROFILE */}
                <DropdownMenuItem
                  onClick={() => navigate(profileRoute)}
                  className="cursor-pointer rounded-xl py-3"
                >

                  <User className="mr-2 h-4 w-4" />

                  Profile

                </DropdownMenuItem>

             {/* ABOUT */}
<NavLink to="/about">
  <DropdownMenuItem className="cursor-pointer rounded-xl py-3">
    <BookA className="mr-2 h-4 w-4" />
    About
  </DropdownMenuItem>
</NavLink>

<DropdownMenuSeparator />
                {/* LOGOUT */}
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="
                    cursor-pointer rounded-xl py-3
                    text-red-600 focus:text-red-600
                  "
                >

                  <LogOut className="mr-2 h-4 w-4" />

                  Logout

                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          ) : (

            <Link
              to="/login"
              className="
                px-5 py-2 rounded-xl
                bg-black text-white
                hover:bg-zinc-800
                transition font-medium
              "
            >
              Login
            </Link>

          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="
            md:hidden
            text-black
            hover:text-zinc-600
            transition
          "
        >

          {
            isMobileMenuOpen
              ? <X className="h-7 w-7" />
              : <Menu className="h-7 w-7" />
          }

        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-all duration-300

          ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <div className="bg-white border-t px-5 py-5">

          {user ? (

            <div className="flex flex-col gap-5">

              {/* USER INFO */}
              <div className="flex items-center gap-3">

                <Avatar>

                  <AvatarImage src={user?.avatar} />

                  <AvatarFallback className="bg-black text-white">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>

                </Avatar>

                <div>

                  <h1 className="font-semibold text-black">
                    {user?.username}
                  </h1>

                  <p className="text-sm text-zinc-500 capitalize">
                    {user?.role}
                  </p>

                </div>
              </div>

              {/* DASHBOARD */}
              <button
                onClick={() => navigate(dashboardRoute)}
                className="
                  flex items-center gap-3
                  text-black font-medium
                "
              >

                <LayoutDashboard size={18} />

                {
                  user?.role === "admin"
                    ? "Admin Dashboard"
                    : "User Dashboard"
                }

              </button>

              {/* PROFILE */}
              <button
                onClick={() => navigate(profileRoute)}
                className="
                  flex items-center gap-3
                  text-black font-medium
                "
              >

                <User size={18} />

                Profile

              </button>

              {/* HOME */}
              {/* <button
                onClick={() => navigate("/")}
                className="
                  flex items-center gap-3
                  text-black font-medium
                "
              >

                <Home size={18} />

                Home

              </button> */}

              {/* LOGOUT */}
              <button
                onClick={logoutHandler}
                className="
                  flex items-center gap-3
                  text-red-600 font-medium
                "
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="
                block w-full text-center
                bg-black text-white
                py-3 rounded-xl
                font-medium
              "
            >
              Login
            </Link>

          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar