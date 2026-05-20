import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";

import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle2,
  Clock3,
  Camera,
  GraduationCap,
  Trophy,
  Sparkles,
  BookMarked,
  Activity,
  Crown,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

const UserProfile = () => {
  // ================= STATES =================
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);

  // ================= USER ID =================
  const userId = localStorage.getItem("userId");

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "${API}/admin/users"
      );

      const currentUser = res.data.find(
        (u) => u._id === userId
      );

      setUser(currentUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH ENROLLMENTS =================
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(
        `${API}/enroll/my-courses/${userId}`
      );

      setEnrollments(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchEnrollments();
    }
  }, [userId]);

  // ================= ACTIVE COURSES =================
  const activeCourses = enrollments.filter(
    (course) => course.status === "active"
  );

  const pendingCourses = enrollments.filter(
    (course) => course.status === "pending"
  );


  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-[32px] p-10 shadow-xl border border-zinc-200 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full border-4 border-zinc-200 border-t-black animate-spin mx-auto mb-6" />

          <h2 className="text-2xl font-black text-zinc-900">
            Loading Profile
          </h2>

          <p className="text-zinc-500 mt-2">
            Please wait while we prepare your dashboard
          </p>
        </div>
      </div>
    );
  }

  // ================= NO USER =================
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-[32px] p-10 shadow-xl border border-zinc-200 text-center max-w-md w-full">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <User size={42} className="text-red-500" />
          </div>

          <h2 className="text-3xl font-black text-zinc-900">
            User Not Found
          </h2>

          <p className="text-zinc-500 mt-3">
            Your account session may have expired.
            Please login again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden bg-black text-white">
        {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

        <div className="relative px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
          <div className="max-w-7xl mx-auto">
            {/* TOP */}
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-10">
              {/* LEFT */}
              <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                {/* AVATAR */}
                <div className="relative w-fit">
                  <div
                    className="
                      w-36 h-36 sm:w-40 sm:h-40
                      rounded-[38px]
                      overflow-hidden
                      border border-white/10
                      bg-white/10
                      backdrop-blur-xl
                      shadow-[0_0_50px_rgba(255,255,255,0.08)]
                      flex items-center justify-center
                    "
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <GraduationCap
                        size={72}
                        className="text-white"
                      />
                    )}
                  </div>

                  {/* CAMERA */}
                  <button
                    className="
                      absolute -bottom-2 -right-2
                      w-14 h-14 rounded-2xl
                      bg-white text-black
                      flex items-center justify-center
                      shadow-2xl
                      hover:scale-105
                      transition-all duration-300
                    "
                  >
                    <Camera size={20} />
                  </button>
                </div>

                {/* USER INFO */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full text-sm mb-5 backdrop-blur-md">
                    <Sparkles size={16} />
                    Professional Learning Profile
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                    {user.username}
                  </h1>

                  <p className="text-zinc-300 text-lg mt-4 break-all">
                    {user.email}
                  </p>

                  {/* BADGES */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <div className="bg-green-500/20 border border-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <BadgeCheck size={16} />
                      {user.isVerified
                        ? "Verified Account"
                        : "Unverified"}
                    </div>

                    <div className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold capitalize flex items-center gap-2">
                      <Shield size={16} />
                      {user.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD */}
              <div
                className="
                  w-full xl:w-[350px]
                  bg-white/10
                  border border-white/10
                  rounded-[32px]
                  p-6
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Learning Rank
                    </p>

                    <h2 className="text-3xl font-black mt-1">
                      Gold Student
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                    <Crown size={32} />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      Active Courses
                    </span>

                    <span className="font-bold text-xl">
                      {activeCourses.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      Pending Courses
                    </span>

                    <span className="font-bold text-xl">
                      {pendingCourses.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      Certificates
                    </span>

                    <span className="font-bold text-xl">
                      0
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      Joined
                    </span>

                    <span className="font-bold">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
              {/* ACTIVE */}
              <div
                className="
                  bg-white/10
                  border border-white/10
                  rounded-[30px]
                  p-6
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Active Courses
                    </p>

                    <h2 className="text-4xl font-black mt-3">
                      {activeCourses.length}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center">
                    <GraduationCap size={28} />
                  </div>
                </div>
              </div>

              {/* LEARNING HOURS */}
              <div
                className="
                  bg-white/10
                  border border-white/10
                  rounded-[30px]
                  p-6
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Learning Hours
                    </p>

                    <h2 className="text-4xl font-black mt-3">
                      0h
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                    <Clock3 size={28} />
                  </div>
                </div>
              </div>

              {/* VERIFIED */}
              <div
                className="
                  bg-white/10
                  border border-white/10
                  rounded-[30px]
                  p-6
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Verification
                    </p>

                    <h2 className="text-2xl font-black mt-3 text-green-400">
                      {user.isVerified
                        ? "Verified"
                        : "Pending"}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div
                className="
                  bg-white/10
                  border border-white/10
                  rounded-[30px]
                  p-6
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Account Status
                    </p>

                    <h2 className="text-2xl font-black mt-3 text-green-400">
                      Active
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center">
                    <Activity size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 2xl:grid-cols-3 gap-8">
          {/* ================= LEFT ================= */}
          <div className="2xl:col-span-2 space-y-8">
            {/* ACCOUNT INFO */}
            <div className="bg-white rounded-[35px] border border-zinc-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-black text-zinc-900">
                    Account Information
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    Personal details and account data
                  </p>
                </div>

                <div className="bg-zinc-100 px-5 py-2 rounded-full text-sm font-semibold">
                  Secure Profile
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* EMAIL */}
                <div
                  className="
                    bg-zinc-50
                    border border-zinc-200
                    rounded-3xl
                    p-6
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Mail size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-500">
                        Email Address
                      </p>

                      <h3 className="font-bold text-zinc-900 mt-2 break-all">
                        {user.email}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* ROLE */}
                <div
                  className="
                    bg-zinc-50
                    border border-zinc-200
                    rounded-3xl
                    p-6
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Shield size={24} />
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">
                        User Role
                      </p>

                      <h3 className="font-bold text-zinc-900 mt-2 capitalize">
                        {user.role}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* JOINED */}
                <div
                  className="
                    bg-zinc-50
                    border border-zinc-200
                    rounded-3xl
                    p-6
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Calendar size={24} />
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">
                        Joined On
                      </p>

                      <h3 className="font-bold text-zinc-900 mt-2">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* VERIFIED */}
                <div
                  className="
                    bg-zinc-50
                    border border-zinc-200
                    rounded-3xl
                    p-6
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">
                        Verification
                      </p>

                      <h3 className="font-bold text-zinc-900 mt-2">
                        {user.isVerified
                          ? "Verified"
                          : "Not Verified"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT COURSES */}
            <div className="bg-white rounded-[35px] border border-zinc-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-zinc-900">
                    Recent Enrollments
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    Your latest learning activity
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {enrollments.length > 0 ? (
                  enrollments.slice(0, 5).map((item) => (
                    <div
                      key={item._id}
                      className="
                        flex flex-col lg:flex-row lg:items-center justify-between
                        gap-5
                        border border-zinc-200
                        rounded-3xl
                        p-5
                        hover:shadow-lg
                        transition-all duration-300
                      "
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
                          <GraduationCap size={30} />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-zinc-900">
                            {item.courseId?.title ||
                              "Course"}
                          </h3>

                          <p className="text-zinc-500 mt-2">
                            {item.courseId?.description?.slice(
                              0,
                              80
                            ) || "No description"}
                            ...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <span
                          className={`
                            px-4 py-2 rounded-full text-sm font-semibold
                            ${
                              item.status === "active"
                                ? "bg-green-100 text-green-700"
                                : item.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {item.status}
                        </span>

                        <button
                          className="
                            w-12 h-12 rounded-2xl
                            bg-zinc-100 hover:bg-black hover:text-white
                            flex items-center justify-center
                            transition-all duration-300
                          "
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-14">
                    <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
                      <BookMarked
                        size={42}
                        className="text-zinc-500"
                      />
                    </div>

                    <h3 className="text-2xl font-black text-zinc-900">
                      No Courses Yet
                    </h3>

                    <p className="text-zinc-500 mt-3">
                      Enrolled courses will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-8">
            {/* ACHIEVEMENTS */}
            <div className="bg-white rounded-[35px] border border-zinc-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                  <Trophy size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-zinc-900">
                    Achievements
                  </h2>

                  <p className="text-zinc-500 text-sm">
                    Your LMS milestones
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black flex items-center justify-center">
                      🏆
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-900">
                        Beginner Learner
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        Joined the LMS platform
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-900">
                        Verified User
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        Account successfully verified
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                      🎓
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-900">
                        Course Explorer
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        Enrolled in courses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="bg-black text-white rounded-[35px] p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
                  <Sparkles size={16} />
                  Learning Progress
                </div>

                <h2 className="text-4xl font-black leading-tight">
                  Keep Growing
                </h2>

                <p className="text-zinc-300 mt-4 leading-relaxed">
                  Continue learning to unlock certificates
                  and achievements.
                </p>

                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span>Progress</span>

                    <span>
                      {activeCourses.length}/10
                    </span>
                  </div>

                  <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width: `${activeCourses.length * 10}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;