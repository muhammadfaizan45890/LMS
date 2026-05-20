import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import API from "../../config/api";
import UserPayment from "./UserPayment"

import {
  Search,
  BookOpen,
  Clock3,
  Wallet,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Layers3,
  ArrowRight
} from "lucide-react"

const UserDashboard = () => {

  // ================= STATES =================
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [search, setSearch] = useState("")
  const [enrolledCourses, setEnrolledCourses] = useState([])

  // ================= USER ID =================
  const userId = localStorage.getItem("userId")

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {

      setLoading(true)

      const res = await axios.get(
        "${API}/admin/courses"
      )

      setCourses(res.data || [])

    } catch (error) {

      console.log("COURSE ERROR:", error)

    } finally {

      setLoading(false)

    }
  }

  // ================= FETCH ENROLLMENTS =================
  const fetchEnrollments = async () => {
    try {

      if (!userId) return

      const res = await axios.get(
        `${API}/enroll/my-courses/${userId}`
      )

      setEnrolledCourses(res.data || [])

    } catch (error) {

      console.log("ENROLLMENT ERROR:", error)

    }
  }

  useEffect(() => {
    fetchCourses()
    fetchEnrollments()
  }, [])

  // ================= SEARCH FILTER =================
  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title?.toLowerCase().includes(search.toLowerCase())
    )
  }, [courses, search])

  // ================= CHECK ENROLLMENT =================
  const getEnrollment = (courseId) => {
    return enrolledCourses.find(
      (item) => item.courseId?._id === courseId
    )
  }

  // ================= STATS =================
  const activeCourses = enrolledCourses.filter(
    (item) => item.status === "active"
  ).length

  const pendingCourses = enrolledCourses.filter(
    (item) => item.status === "pending"
  ).length

  const totalCourses = courses.length

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* ================= HERO SECTION ================= */}
      <div className="relative overflow-hidden bg-black text-white">

        {/* GLOW */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

            {/* LEFT */}
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-semibold mb-6">
                <Sparkles size={16} />
                Modern LMS Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Learn New Skills
                <span className="block text-zinc-400 mt-2">
                  Anytime Anywhere
                </span>
              </h1>

              <p className="text-zinc-300 mt-6 text-lg leading-relaxed max-w-2xl">
                Explore premium courses, watch secure lectures,
                track progress, and build your future with
                our powerful LMS learning platform.
              </p>

            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-2xl">

              {/* TOTAL */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-5">
                  <Layers3 size={28} />
                </div>

                <p className="text-zinc-300 text-sm">
                  Total Courses
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {totalCourses}
                </h2>

              </div>

              {/* ACTIVE */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-5">
                  <CheckCircle2 size={28} />
                </div>

                <p className="text-zinc-300 text-sm">
                  Active Courses
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {activeCourses}
                </h2>

              </div>

              {/* PENDING */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-white flex items-center justify-center mb-5">
                  <AlertCircle size={28} />
                </div>

                <p className="text-zinc-300 text-sm">
                  Pending
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {pendingCourses}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* ================= TOP BAR ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-black">
              Explore Courses
            </h2>

            <p className="text-zinc-600 mt-2">
              Find the best courses and start learning today
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-[380px]">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-14
                pl-12 pr-4
                rounded-2xl
                border border-zinc-300
                bg-white
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-black
                transition-all
              "
            />

          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {[1,2,3,4,5,6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-[30px] p-6 shadow-sm border border-zinc-200 animate-pulse"
              >

                <div className="flex items-center justify-between mb-6">

                  <div className="w-16 h-16 bg-zinc-200 rounded-2xl" />

                  <div className="w-20 h-8 bg-zinc-200 rounded-full" />

                </div>

                <div className="h-7 bg-zinc-200 rounded mb-4" />
                <div className="h-4 bg-zinc-200 rounded mb-2" />
                <div className="h-4 bg-zinc-200 rounded mb-2" />
                <div className="h-4 bg-zinc-200 rounded w-2/3 mb-8" />

                <div className="h-12 bg-zinc-300 rounded-2xl" />

              </div>
            ))}

          </div>

        ) : filteredCourses.length === 0 ? (

          <div className="bg-white rounded-[35px] p-14 text-center border border-zinc-200 shadow-sm">

            <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
              <BookOpen size={40} className="text-zinc-500" />
            </div>

            <h2 className="text-3xl font-black text-black">
              No Courses Found
            </h2>

            <p className="text-zinc-500 mt-4 text-lg">
              Try another keyword to search courses
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {filteredCourses.map((course) => {

              const enrollment = getEnrollment(course._id)

              return (
                <div
                  key={course._id}
                  className="
                    group
                    bg-white
                    rounded-[35px]
                    border border-zinc-200
                    p-7
                    shadow-sm
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all duration-500
                    flex flex-col
                    overflow-hidden
                    relative
                  "
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between mb-6">

                    <div className="
                      w-16 h-16
                      rounded-2xl
                      bg-black
                      text-white
                      flex items-center justify-center
                      shadow-lg
                    ">
                      <GraduationCap size={30} />
                    </div>

                    {enrollment && (
                      <span
                        className={`
                          px-4 py-2
                          rounded-full
                          text-xs
                          font-bold
                          capitalize
                          ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-700"
                              : enrollment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {enrollment.status}
                      </span>
                    )}

                  </div>

                  {/* TITLE */}
                  <h2 className="text-3xl font-black text-black leading-tight">
                    {course.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-zinc-600 mt-4 leading-relaxed flex-grow">
                    {course.description}
                  </p>

                  {/* INFO */}
                  <div className="mt-7 space-y-4">

                    <div className="flex items-center gap-3 text-zinc-700">

                      <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <Clock3 size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Duration
                        </p>

                        <h4 className="font-bold">
                          {course.duration}
                        </h4>
                      </div>

                    </div>

                    <div className="flex items-center gap-3 text-zinc-700">

                      <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <Wallet size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Course Price
                        </p>

                        <h4 className="font-bold">
                          {course.price || "Free"}
                        </h4>
                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}
                  {enrollment ? (

                    <button
                      disabled
                      className={`
                        mt-8
                        w-full
                        py-4
                        rounded-2xl
                        font-bold
                        cursor-not-allowed
                        ${
                          enrollment.status === "active"
                            ? "bg-green-600 text-white"
                            : enrollment.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }
                      `}
                    >
                      {enrollment.status === "active"
                        ? "Already Enrolled"
                        : enrollment.status === "pending"
                        ? "Request Pending"
                        : "Refund Requested"}
                    </button>

                  ) : (

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="
                        mt-8
                        w-full
                        bg-black
                        text-white
                        py-4
                        rounded-2xl
                        font-bold
                        hover:bg-zinc-800
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        group-hover:scale-[1.02]
                      "
                    >
                      Enroll Now
                      <ArrowRight size={18} />
                    </button>

                  )}

                </div>
              )
            })}

          </div>
        )}

      </div>

      {/* ================= PAYMENT MODAL ================= */}
      {selectedCourse && (
        <UserPayment
          course={selectedCourse}
          userId={userId}
          onClose={() => {
            setSelectedCourse(null)
            fetchEnrollments()
          }}
        />
      )}

    </div>
  )
}

export default UserDashboard