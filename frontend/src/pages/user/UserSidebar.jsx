import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import {
  LayoutDashboard,
  User,
  BookOpen,
  Heart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  BookKeyIcon,
  DollarSignIcon,
  BookCheck,
  Book
} from "lucide-react"

const UserSidebar = () => {
  const navigate = useNavigate()

  const NAVBAR_HEIGHT = 64

  // ================= STATES =================
  const [collapsed, setCollapsed] = useState(false)
  const [, setIsMobile] = useState(false)

  // ================= RESPONSIVE =================
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024

      setIsMobile(mobile)

      // MOBILE = COLLAPSED
      // DESKTOP = EXPANDED
      if (mobile) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // ================= MENU =================
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/user/dashboard"
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/user/profile"
    },
    {
      title: "Active Courses",
      icon: <BookOpen size={20} />,
      path: "/user/active-courses"
    },
    {
      title: "Notes",
      icon: <Book size={20} />,
      path: "/user/notes"
    },
    {
      title: "Apply for Refund",
      icon: <DollarSignIcon size={20} />,
      path: "/user/apply-refund"
    },
    {
      title: "Certificate",
      icon: <BookCheck size={20} />,
      path: "/user/certificate"
    },
    {
      title: "LMS Guide",
      icon: <BookKeyIcon size={20} />,
      path: "/user/guide"
    },


  ]

  // ================= LOGOUT =================
  const logoutHandler = () => {
    // CLEAR ALL AUTH DATA
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    localStorage.clear()

    // REDIRECT TO LOGIN
    navigate("/login", { replace: true })

    // OPTIONAL FULL REFRESH
    window.location.reload()
  }

  return (
    <>
      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          top: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
        }}
        className={`
          fixed left-0 z-[100]
          bg-white text-black
          border-r border-zinc-300
          flex flex-col
          transition-all duration-300 ease-in-out
          shadow-sm

          ${collapsed ? "w-[80px]" : "w-[280px]"}
        `}
      >
        {/* ================= HEADER ================= */}
        <div
          className={`
            flex items-center
            px-4 py-5
            border-b border-zinc-300

            ${
              collapsed
                ? "justify-center"
                : "justify-between"
            }
          `}
        >
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-xl">
              <ShieldCheck size={20} />
            </div>

            {!collapsed && (
              <div>
                <h1 className="font-bold text-sm">
                  Student Panel
                </h1>

                <p className="text-xs text-zinc-500">
                  LMS Dashboard
                </p>
              </div>
            )}
          </div>

          {/* TOGGLE */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="text-zinc-500 hover:text-black"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="
                absolute -right-3 top-6
                bg-black text-white
                rounded-full p-1
                shadow-md
              "
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        {/* ================= MENU ================= */}
        <div className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-start"
                }
                gap-3
                px-4 py-3
                rounded-2xl
                transition-all duration-200

                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
                }
              `}
            >
              {item.icon}

              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t border-zinc-300 p-3">
          <button
            onClick={logoutHandler}
            className={`
              w-full flex items-center
              ${
                collapsed
                  ? "justify-center"
                  : "justify-start"
              }
              gap-3
              px-4 py-3
              rounded-2xl
              text-red-600
              hover:bg-red-50
              transition-all duration-200
            `}
          >
            <LogOut size={20} />

            {!collapsed && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ================= CONTENT SPACER ================= */}
      <div
        className={`
          transition-all duration-300
          ${collapsed ? "w-[80px]" : "w-[280px]"}
        `}
      />
    </>
  )
}

export default UserSidebar