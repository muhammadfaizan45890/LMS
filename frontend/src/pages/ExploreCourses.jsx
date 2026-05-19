import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Clock3,
  DollarSign,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  PlayCircle,
  CheckCircle2,
  Search,
} from "lucide-react";

const ExploreCourses = () => {
  // ================= STATES =================
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // ================= USER =================
  const userId = localStorage.getItem("userId");

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/user/course"
      );

      setCourses(res.data || []);
      setFilteredCourses(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredCourses(filtered);
  }, [search, courses]);

  // ================= NAVIGATION =================
const handleCourse = () => {

  // USER LOGGED IN
  if (userId) {

    navigate("/user/dashboard");

  }

  // USER NOT LOGGED IN
  else {

    navigate("/login");

  }

};

  return (
    <div className="relative min-h-screen bg-zinc-100 overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-zinc-300/30 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zinc-400/20 blur-[140px] rounded-full" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-4xl">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles size={16} />
              Modern LMS Learning Experience
            </div>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Offered Courses
              <span className="block text-zinc-400 mt-2">
                Learn Skills That Matter
              </span>
            </h1>

            {/* DESC */}
            <p className="mt-8 text-zinc-300 text-lg max-w-2xl leading-relaxed">
              Explore premium learning programs, interactive video
              lectures, real-world projects, and modern learning
              experiences designed for future professionals.
            </p>

            {/* SEARCH */}
            <div className="mt-10 relative max-w-xl">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  bg-white/10
                  border border-white/10
                  backdrop-blur-xl
                  rounded-2xl
                  py-4 pl-14 pr-5
                  text-white
                  placeholder:text-zinc-400
                  outline-none
                  focus:border-white/30
                  transition-all duration-300
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-black">
                Available Courses
              </h2>

              <p className="text-zinc-600 mt-3 text-lg">
                Discover professional courses and start learning today.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-sm text-zinc-500">
                Total Courses
              </p>

              <h3 className="text-3xl font-black text-black">
                {filteredCourses.length}
              </h3>
            </div>
          </div>

          {/* ================= LOADING ================= */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="
                    h-[420px]
                    rounded-[35px]
                    bg-white
                    animate-pulse
                    border border-zinc-200
                  "
                />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            /* ================= EMPTY ================= */
            <div className="bg-white rounded-[35px] border border-zinc-200 p-14 text-center shadow-sm">
              <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
                <GraduationCap size={42} />
              </div>

              <h2 className="text-3xl font-black text-black">
                No Courses Found
              </h2>

              <p className="text-zinc-500 mt-4 max-w-lg mx-auto">
                We could not find any matching courses. Try another
                search term or check back later.
              </p>
            </div>
          ) : (
            /* ================= COURSES GRID ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course._id}
                  className="
                    group
                    relative
                    bg-white
                    border border-zinc-200
                    rounded-[35px]
                    overflow-hidden
                    hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                    hover:-translate-y-2
                    transition-all duration-500
                  "
                >
                  {/* TOP */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-8 text-white">
                    {/* GLOW */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                    {/* COURSE ICON */}
                    <div
                      className="
                        relative
                        w-20 h-20
                        rounded-3xl
                        bg-white/10
                        border border-white/10
                        backdrop-blur-md
                        flex items-center justify-center
                        shadow-xl
                      "
                    >
                      <GraduationCap size={38} />
                    </div>

                    {/* TITLE */}
                    <div className="mt-7">
                      <div className="flex items-center gap-2 text-yellow-400 mb-4">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-semibold">
                          Premium Course
                        </span>
                      </div>

                      <h2 className="text-2xl font-black leading-tight">
                        {course.title}
                      </h2>

                      <p className="text-zinc-300 mt-4 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-7">
                    {/* STATS */}
                    <div className="space-y-4">
                      {/* DURATION */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-zinc-500">
                          <Clock3 size={18} />
                          <span>Duration</span>
                        </div>

                        <span className="font-bold text-zinc-900">
                          {course.duration || "N/A"}
                        </span>
                      </div>

                      {/* PRICE */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-zinc-500">
                          <DollarSign size={18} />
                          <span>Price</span>
                        </div>

                        <span className="font-bold text-zinc-900">
                          {course.price || "Free"}
                        </span>
                      </div>

                      {/* LEVEL */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-zinc-500">
                          <PlayCircle size={18} />
                          <span>Learning Mode</span>
                        </div>

                        <span className="font-bold text-zinc-900">
                          Video Based
                        </span>
                      </div>

                      {/* CERTIFICATE */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-zinc-500">
                          <CheckCircle2 size={18} />
                          <span>Certificate</span>
                        </div>

                        <span className="font-bold text-green-600">
                          Included
                        </span>
                      </div>
                    </div>

                    {/* STUDENTS */}
                    <div className="mt-7 flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                          <Users size={20} />
                        </div>

                        <div>
                          <p className="text-sm text-zinc-500">
                            Students
                          </p>

                          <h4 className="font-bold text-black">
                            1000+ Enrolled
                          </h4>
                        </div>
                      </div>

                      <div className="text-green-600 text-sm font-bold">
                        Active
                      </div>
                    </div>

                    {/* BUTTON */}
{/* BUTTON */}
<button
  onClick={handleCourse}
  className="
    mt-8
    w-full
    h-14
    rounded-2xl
    bg-black
    hover:bg-zinc-800
    text-white
    font-semibold
    flex items-center justify-center gap-3
    transition-all duration-300
    group-hover:scale-[1.02]
  "
>
  Explore Course

  <ArrowRight
    size={20}
    className="group-hover:translate-x-1 transition-all duration-300"
  />
</button>
                  </div>

                  {/* FLOATING BADGE */}
                  <div className="absolute top-5 right-5 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExploreCourses;