import React, { useEffect, useState } from "react"
import axios from "axios"
import API from "../../config/api";

import {
  BookOpen,
  Clock3,
  Trash2,
  IndianRupee,
  Plus,
  Loader2,
  GraduationCap,
  Search,
  Sparkles,
  BadgeCheck,
  DollarSign,
  DollarSignIcon
} from "lucide-react"

const AdminCourses = () => {

  // ================= STATES =================
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [search, setSearch] = useState("")

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: ""
  })

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {

      setLoading(true)

      const res = await axios.get(
        "${API}/admin/courses"
      )

      setCourses(res.data || [])

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // ================= ADD COURSE =================
  const addCourse = async (e) => {

    e.preventDefault()

    try {

      setCreating(true)

      await axios.post(
        "${API}/admin/course",
        form
      )

      // RESET FORM
      setForm({
        title: "",
        description: "",
        duration: "",
        price: ""
      })

      // REFRESH
      fetchCourses()

    } catch (error) {
      console.log(error)
      alert("Failed to add course")
    } finally {
      setCreating(false)
    }
  }

  // ================= DELETE COURSE =================
  const deleteCourse = async (id) => {

    try {

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?"
      )

      if (!confirmDelete) return

      setDeletingId(id)

      await axios.delete(
        `${API}/admin/course/${id}`
      )

      // REMOVE FROM UI
      setCourses((prev) =>
        prev.filter((course) => course._id !== id)
      )

    } catch (error) {
      console.log(error)
      alert("Failed to delete course")
    } finally {
      setDeletingId(null)
    }
  }

  // ================= FILTER COURSES =================
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-6 lg:p-10">

      {/* ================= TOP HEADER ================= */}
      <div className="mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            LMS Admin Panel
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-black">
            Course Management
          </h1>

          <p className="text-zinc-600 mt-3 text-lg">
            Create, manage, and delete LMS courses easily.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm min-w-[220px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-sm">
                  Total Courses
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {courses.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <BookOpen size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm min-w-[220px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-sm">
                  Active System
                </p>

                <h2 className="text-2xl font-black text-green-600 mt-2">
                  Running
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                <BadgeCheck size={28} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ================= ADD COURSE FORM ================= */}
      <div className="bg-white rounded-[35px] border border-zinc-200 shadow-sm overflow-hidden mb-10">

        {/* HEADER */}
        <div className="bg-black px-6 sm:px-10 py-8 text-white">

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center">
              <GraduationCap size={30} />
            </div>

            <div>
              <h2 className="text-3xl font-black">
                Add New Course
              </h2>

              <p className="text-zinc-300 mt-1">
                Create a new course for students
              </p>
            </div>
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={addCourse}
          className="p-6 sm:p-10"
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* TITLE */}
            <div>
              <label className="text-sm font-semibold text-zinc-700 block mb-2">
                Course Title
              </label>

              <input
                type="text"
                placeholder="Enter course title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border border-zinc-300
                  px-5
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  transition
                "
                required
              />
            </div>

            {/* DURATION */}
            <div>
              <label className="text-sm font-semibold text-zinc-700 block mb-2">
                Course Duration
              </label>

              <input
                type="text"
                placeholder="e.g. 6 Months"
                value={form.duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duration: e.target.value
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border border-zinc-300
                  px-5
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  transition
                "
                required
              />
            </div>

            {/* PRICE */}
            <div className="lg:col-span-2">
              <label className="text-sm font-semibold text-zinc-700 block mb-2">
                Course Price
              </label>

              <div className="relative">

                <DollarSignIcon
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="number"
                  placeholder="Enter course price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value
                    })
                  }
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border border-zinc-300
                    pl-12
                    pr-5
                    outline-none
                    focus:ring-2
                    focus:ring-black
                    transition
                  "
                />

              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="lg:col-span-2">
              <label className="text-sm font-semibold text-zinc-700 block mb-2">
                Course Description
              </label>

              <textarea
                rows={6}
                placeholder="Write course description..."
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                }
                className="
                  w-full
                  rounded-3xl
                  border border-zinc-300
                  p-5
                  outline-none
                  resize-none
                  focus:ring-2
                  focus:ring-black
                  transition
                "
                required
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={creating}
            className="
              mt-8
              h-14
              px-8
              rounded-2xl
              bg-black
              text-white
              font-bold
              flex items-center justify-center gap-3
              hover:scale-[1.02]
              transition-all
              disabled:opacity-60
              w-full sm:w-fit
            "
          >

            {creating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating Course...
              </>
            ) : (
              <>
                <Plus size={20} />
                Add Course
              </>
            )}

          </button>

        </form>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm mb-8">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-14
              rounded-2xl
              border border-zinc-300
              pl-12
              pr-5
              outline-none
              focus:ring-2
              focus:ring-black
            "
          />

        </div>

      </div>

      {/* ================= LOADING ================= */}
      {loading ? (

        <div className="flex items-center justify-center py-24">

          <div className="flex flex-col items-center gap-5">

            <Loader2
              size={50}
              className="animate-spin text-black"
            />

            <h2 className="text-2xl font-bold">
              Loading Courses...
            </h2>

          </div>

        </div>

      ) : filteredCourses.length === 0 ? (

        <div className="bg-white rounded-3xl border border-zinc-200 p-16 text-center shadow-sm">

          <BookOpen
            size={70}
            className="mx-auto text-zinc-400 mb-5"
          />

          <h2 className="text-3xl font-black text-black">
            No Courses Found
          </h2>

          <p className="text-zinc-500 mt-3">
            Create your first LMS course now.
          </p>

        </div>

      ) : (

        /* ================= COURSE GRID ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">

          {filteredCourses.map((course) => (

            <div
              key={course._id}
              className="
                bg-white
                rounded-[35px]
                border border-zinc-200
                overflow-hidden
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-500
              "
            >

              {/* TOP */}
              <div className="bg-black p-6 text-white">

                <div className="flex items-center justify-between">

                  <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center">
                    <GraduationCap size={30} />
                  </div>

                  <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm">
                    LMS Course
                  </div>

                </div>

                <h2 className="text-3xl font-black mt-6 line-clamp-2">
                  {course.title}
                </h2>

              </div>

              {/* BODY */}
              <div className="p-6">

                <p className="text-zinc-600 leading-relaxed line-clamp-4 min-h-[110px]">
                  {course.description}
                </p>

                {/* INFO */}
                <div className="space-y-4 mt-6">

                  <div className="flex items-center gap-3 text-zinc-700">
                    <Clock3 size={20} />
                    <span className="font-medium">
                      Duration: {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-700">
                    <DollarSign size={20} />
                    <span className="font-medium">
                      Price: {course.price || 0}
                    </span>
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="mt-8">

                  <button
                    onClick={() =>
                      deleteCourse(course._id)
                    }
                    disabled={deletingId === course._id}
                    className="
                      w-full
                      h-13
                      rounded-2xl
                      bg-red-500
                      text-white
                      font-bold
                      flex items-center justify-center gap-3
                      hover:bg-red-600
                      transition
                      disabled:opacity-60
                    "
                  >

                    {deletingId === course._id ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={20} />
                        Delete Course
                      </>
                    )}

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default AdminCourses