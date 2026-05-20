import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";

import {
  BookOpen,
  Clock3,
  DollarSign,
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
  Layers3,
  CalendarDays,
  Sparkles,
  Circle,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

const ActiveCourses = () => {
  // ================= STATES =================
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState(false);
  const [courseData, setCourseData] = useState(null);

  // ================= WATCHED MODULES =================
  const [watchedModules, setWatchedModules] = useState([]);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/enroll/my-courses/${userId}`
      );

      const activeCourses = (res.data || []).filter(
        (item) => item.status === "active"
      );

      setCourses(activeCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= LOAD WATCHED MODULES =================
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("watchedModules")) || [];

    setWatchedModules(saved);
  }, []);

  // ================= MARK AS WATCHED =================
  const markAsWatched = (moduleId) => {
    if (!watchedModules.includes(moduleId)) {
      const updated = [...watchedModules, moduleId];

      setWatchedModules(updated);

      localStorage.setItem(
        "watchedModules",
        JSON.stringify(updated)
      );
    }
  };

  // ================= OPEN COURSE =================
  const openCourse = async (courseId) => {
    try {
      const [courseRes, moduleRes] = await Promise.all([
        axios.get(`${API}/admin/course/${courseId}`),

        axios.get(
          `${API}/api/modules/course/${courseId}`
        ),
      ]);

      setCourseData({
        ...courseRes.data,
        modules: moduleRes.data || [],
      });

      setSelectedCourse(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= WATCH VIDEO =================
  const watchVideo = (module) => {
    markAsWatched(module._id);

    navigate("/user/video", {
      state: {
        youtubeUrl: module.youtubeUrl,
      },
    });
  };

  // ================= COURSE DETAILS PAGE =================
  if (selectedCourse && courseData) {
    return (
      <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
        {/* ================= HERO ================= */}
        <div className="relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

          <div className="relative px-4 sm:px-6 lg:px-10 py-8 lg:py-14">
            {/* BACK BUTTON */}
            <button
              onClick={() => {
                setSelectedCourse(false);
                setCourseData(null);
              }}
              className="
                flex items-center gap-2
                bg-white/10 hover:bg-white/20
                border border-white/10
                px-5 py-3 rounded-2xl
                transition-all duration-300
                backdrop-blur-md
              "
            >
              <ArrowLeft size={18} />
              Back To Courses
            </button>

            {/* HERO CONTENT */}
            <div className="mt-10 flex flex-col xl:flex-row gap-10 items-start justify-between">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
                  <Sparkles size={16} />
                  Premium Learning Experience
                </div>

                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                  <BookOpen size={42} />
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  {courseData?.title}
                </h1>

                <p className="mt-6 text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                  {courseData?.description}
                </p>
              </div>

              {/* COURSE STATS */}
              <div className="w-full xl:w-[350px] bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-6">
                  Course Information
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock3 size={18} />
                      <span>Duration</span>
                    </div>

                    <span className="font-semibold">
                      {courseData?.duration || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign size={18} />
                      <span>Price</span>
                    </div>

                    <span className="font-semibold">
                      {courseData?.price || "Free"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Layers3 size={18} />
                      <span>Modules</span>
                    </div>

                    <span className="font-semibold">
                      {courseData?.modules?.length || 0}
                    </span>
                  </div>

                  {/* PROGRESS */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-green-400"
                      />
                      <span>Completed</span>
                    </div>

                    <span className="font-semibold text-green-300">
                      {
                        courseData?.modules?.filter((m) =>
                          watchedModules.includes(m._id)
                        ).length
                      }
                      /
                      {courseData?.modules?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COURSE CONTENT ================= */}
        <div className="px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Course Modules
              </h2>

              <p className="text-zinc-500 mt-2">
                Watch lectures and continue learning
              </p>
            </div>

            {/* PROGRESS CARD */}
            <div className="bg-white border border-zinc-200 rounded-2xl px-5 py-3 shadow-sm">
              <p className="text-sm text-zinc-500">
                Learning Progress
              </p>

              <h3 className="text-2xl font-bold text-black">
                {
                  courseData?.modules?.filter((m) =>
                    watchedModules.includes(m._id)
                  ).length
                }
                /
                {courseData?.modules?.length || 0}
              </h3>
            </div>
          </div>

          {/* MODULES */}
          <div className="space-y-5">
            {courseData?.modules?.length > 0 ? (
              courseData.modules.map((m, i) => {
                const watched = watchedModules.includes(m._id);

                return (
                  <div
                    key={i}
                    className="
                      bg-white
                      rounded-3xl
                      border border-zinc-200
                      p-5 sm:p-6
                      hover:shadow-xl
                      transition-all duration-300
                    "
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* LEFT */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`
                            min-w-[60px]
                            h-[60px]
                            rounded-2xl
                            flex items-center justify-center
                            text-lg font-bold
                            ${
                              watched
                                ? "bg-green-600 text-white"
                                : "bg-black text-white"
                            }
                          `}
                        >
                          {watched ? (
                            <CheckCircle size={28} />
                          ) : (
                            i + 1
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                              {m.title}
                            </h3>

                            {watched ? (
                              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                                Watched
                              </span>
                            ) : (
                              <span className="bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full font-semibold">
                                Not Watched
                              </span>
                            )}
                          </div>

                          <p className="text-zinc-500 mt-2 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <button
                        onClick={() => watchVideo(m)}
                        className={`
                          flex items-center justify-center gap-2
                          px-6 py-4
                          rounded-2xl
                          transition-all duration-300
                          w-full lg:w-auto
                          ${
                            watched
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-black hover:bg-zinc-800 text-white"
                          }
                        `}
                      >
                        {watched ? (
                          <>
                            <CheckCircle2 size={20} />
                            Watched
                          </>
                        ) : (
                          <>
                            <PlayCircle size={20} />
                            Watch Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-zinc-200">
                <div className="text-6xl mb-5">
                  📂
                </div>

                <h3 className="text-2xl font-bold text-zinc-900">
                  No Modules Available
                </h3>

                <p className="text-zinc-500 mt-3">
                  Admin has not uploaded modules yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN PAGE =================
  return (
    <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
      {/* ================= TOP HERO ================= */}
      <div className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

        <div className="relative px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles size={16} />
              Continue Your Learning Journey
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Active Courses
            </h1>

            <p className="text-zinc-300 mt-5 text-base sm:text-lg max-w-2xl">
              Access your enrolled courses, continue learning,
              and watch premium modules anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
                  bg-white
                  rounded-3xl
                  h-[350px]
                  animate-pulse
                "
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200 p-10 lg:p-16 text-center">
            <div className="text-7xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-black text-zinc-900">
              No Active Courses
            </h2>

            <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
              Once admin approves your enrollment request,
              your active courses will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
{courses.map((item) => (
  <div
    key={item._id}
    className="
      group
      relative
      overflow-hidden
      rounded-[32px]
      border border-zinc-200/80
      bg-white/80
      backdrop-blur-xl
      shadow-sm
      hover:shadow-2xl
      transition-all duration-500
      hover:-translate-y-2
    "
  >
    {/* TOP GLOW */}
    <div className="absolute -top-20 -right-20 w-52 h-52 bg-zinc-300/20 blur-3xl rounded-full" />

    {/* HEADER */}
    <div
      className="
        relative
        bg-gradient-to-br
        from-black
        via-zinc-900
        to-zinc-800
        p-6 sm:p-8
        overflow-hidden
      "
    >
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

      {/* STATUS BADGE */}
      <div className="absolute top-5 right-5">
        <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
          <CheckCircle2 size={14} />
          Active
        </div>
      </div>

      {/* ICON */}
      <div
        className="
          relative
          w-20 h-20
          rounded-3xl
          bg-white/10
          border border-white/10
          backdrop-blur-md
          flex items-center justify-center
          text-4xl
          shadow-2xl
        "
      >
         <div className="absolute inset-0 rounded-[28px] bg-white/5 blur-xl" />

  <BookOpen
    size={40}
    className="relative text-white"
    strokeWidth={2.2}
  />
      </div>

      {/* CONTENT */}
      <div className="relative mt-6">
        <h2
          className="
            text-2xl sm:text-3xl
            font-black
            text-white
            leading-tight
            line-clamp-2
          "
        >
          {item.courseId?.title}
        </h2>

        <p
          className="
            mt-4
            text-zinc-300
            text-sm sm:text-base
            leading-relaxed
            line-clamp-3
          "
        >
          {item.courseId?.description}
        </p>
      </div>
    </div>

    {/* BODY */}
    <div className="p-5 sm:p-6">
      {/* INFO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* DURATION */}
        <div
          className="
            rounded-2xl
            border border-zinc-200
            bg-zinc-50
            p-4
          "
        >
          <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
            <Clock3 size={16} />
            Duration
          </div>

          <h3 className="font-bold text-zinc-900 text-lg">
            {item.courseId?.duration || "N/A"}
          </h3>
        </div>

        {/* PRICE */}
        <div
          className="
            rounded-2xl
            border border-zinc-200
            bg-zinc-50
            p-4
          "
        >
          <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
            <DollarSign size={16} />
            Price
          </div>

          <h3 className="font-bold text-zinc-900 text-lg">
            {item.courseId?.price || "Free"}
          </h3>
        </div>

        {/* ENROLL DATE */}
        <div
          className="
            rounded-2xl
            border border-zinc-200
            bg-zinc-50
            p-4
            sm:col-span-2
          "
        >
          <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
            <CalendarDays size={16} />
            Enrolled On
          </div>

          <h3 className="font-bold text-zinc-900">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "N/A"}
          </h3>
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">

        {/* CONTINUE */}
        <button
          onClick={() =>
            openCourse(item.courseId?._id)
          }
          className="
            flex-1
            bg-black
            hover:bg-zinc-800
            text-white
            py-4
            rounded-2xl
            font-semibold
            transition-all duration-300
            flex items-center justify-center gap-2
            shadow-lg hover:shadow-black/20
          "
        >
          <PlayCircle size={20} />
          Continue Learning
        </button>

        {/* PROGRESS */}
        <div
          className="
            sm:w-[120px]
            rounded-2xl
            bg-green-50
            border border-green-200
            flex flex-col
            items-center
            justify-center
            py-3
          "
        >
          <span className="text-xs text-green-600 font-medium">
            Progress
          </span>

          <span className="text-xl font-black text-green-700">
            {item.courseId?.modules?.length
              ? `${Math.round(
                  (watchedModules.filter((id) =>
                    courseData?.modules?.some(
                      (m) => m._id === id
                    )
                  ).length /
                    item.courseId.modules.length) *
                    100
                )}%`
              : "0%"}
          </span>
        </div>

      </div>
    </div>

    {/* HOVER BORDER */}
    <div
      className="
        absolute inset-0
        rounded-[32px]
        border border-transparent
        group-hover:border-zinc-300
        transition-all duration-500
        pointer-events-none
      "
    />
  </div>
))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveCourses;