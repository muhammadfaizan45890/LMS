import React, { useEffect, useState } from "react";

import {
  Users,
  GraduationCap,
  Award,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  Star,
  Activity,
} from "lucide-react";

const PlatformStats = () => {

  // ================= STATIC STATS =================
  const stats = {
    users: 1534,
    enrollments: 1293,
    certificates: 975,
  };

  // ================= ANIMATED STATS =================
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    enrollments: 0,
    certificates: 0,
  });

  // ================= COUNTER ANIMATION =================
  useEffect(() => {

    const duration = 2500;

    const animateValue = (start, end, key) => {

      let startTimestamp = null;

      const step = (timestamp) => {

        if (!startTimestamp) {
          startTimestamp = timestamp;
        }

        const progress = Math.min(
          (timestamp - startTimestamp) / duration,
          1
        );

        const value = Math.floor(
          progress * (end - start) + start
        );

        setAnimatedStats((prev) => ({
          ...prev,
          [key]: value,
        }));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }

      };

      window.requestAnimationFrame(step);

    };

    animateValue(0, stats.users, "users");
    animateValue(0, stats.enrollments, "enrollments");
    animateValue(0, stats.certificates, "certificates");

  }, []);

  return (
    <div className="relative overflow-hidden bg-zinc-100 py-20 sm:py-24">

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-zinc-300/30 rounded-full blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-zinc-400/20 rounded-full blur-[140px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-white/40 rounded-full blur-[150px]" />

      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-4xl mx-auto">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full text-sm font-semibold shadow-xl">

            <Sparkles size={16} />

            Advanced LMS Analytics

          </div>

          {/* TITLE */}
          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-black">

            Trusted By Students

            <span className="block text-zinc-400 mt-2">
              Across Modern Education
            </span>

          </h1>

          {/* DESC */}
          <p className="mt-8 text-zinc-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">

            Our modern learning management platform helps students
            grow with secure courses, professional certifications,
            and interactive digital learning experiences designed
            for the future.

          </p>

        </div>

        {/* ================= TOP SMALL STATS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16">

          <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Active Growth
                </p>

                <h3 className="text-2xl font-black mt-2">
                  98%
                </h3>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                <TrendingUp size={22} />
              </div>

            </div>

          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Security
                </p>

                <h3 className="text-2xl font-black mt-2">
                  100%
                </h3>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>

            </div>

          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Countries
                </p>

                <h3 className="text-2xl font-black mt-2">
                  20+
                </h3>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Globe size={22} />
              </div>

            </div>

          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Rating
                </p>

                <h3 className="text-2xl font-black mt-2">
                  4.9
                </h3>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-yellow-500 text-white flex items-center justify-center">
                <Star size={22} />
              </div>

            </div>

          </div>

        </div>

        {/* ================= MAIN STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

          {/* USERS */}
          <div className="group relative overflow-hidden bg-white border border-zinc-200 rounded-[35px] p-8 sm:p-10 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition-all duration-500">

            <div className="absolute top-0 right-0 w-40 h-40 bg-zinc-100 rounded-full blur-3xl opacity-70" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center shadow-xl">
                  <Users size={38} />
                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                  +12%
                  <ArrowUpRight size={16} />
                </div>

              </div>

              <h2 className="text-5xl sm:text-6xl font-black mt-10 text-black">

                {animatedStats.users.toLocaleString()}+

              </h2>

              <h3 className="text-2xl font-bold mt-5 text-black">
                Total Users
              </h3>

              <p className="text-zinc-500 mt-5 leading-relaxed">
                Thousands of learners trust our platform for
                professional online education and skill development.
              </p>

            </div>

          </div>

          {/* ENROLLMENTS */}
          <div className="group relative overflow-hidden bg-black text-white rounded-[35px] p-8 sm:p-10 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)] transition-all duration-500">

            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-70" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center shadow-xl">
                  <GraduationCap size={38} />
                </div>

                <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                  Active
                  <Activity size={15} />
                </div>

              </div>

              <h2 className="text-5xl sm:text-6xl font-black mt-10">

                {animatedStats.enrollments.toLocaleString()}+

              </h2>

              <h3 className="text-2xl font-bold mt-5">
                Course Enrollments
              </h3>

              <p className="text-zinc-300 mt-5 leading-relaxed">
                Students continue enrolling in modern premium
                courses and future-focused educational programs.
              </p>

            </div>

          </div>

          {/* CERTIFICATES */}
          <div className="group relative overflow-hidden bg-white border border-zinc-200 rounded-[35px] p-8 sm:p-10 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition-all duration-500">

            <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-60" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-20 h-20 rounded-3xl bg-green-600 text-white flex items-center justify-center shadow-xl">
                  <Award size={38} />
                </div>

                <div className="bg-zinc-100 text-black px-4 py-2 rounded-full text-sm font-bold">
                  Verified
                </div>

              </div>

              <h2 className="text-5xl sm:text-6xl font-black mt-10 text-black">

                {animatedStats.certificates.toLocaleString()}+

              </h2>

              <h3 className="text-2xl font-bold mt-5 text-black">
                Certificates Issued
              </h3>

              <p className="text-zinc-500 mt-5 leading-relaxed">
                Successfully completed students receive verified
                certificates for their achievements and learning.
              </p>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="mt-20 relative overflow-hidden rounded-[40px] bg-gradient-to-r from-black via-zinc-900 to-black p-10 sm:p-14 text-white">

          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[120px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full text-sm font-semibold">

                <Sparkles size={16} />

                Future Of Digital Education

              </div>

              <h2 className="mt-6 text-4xl sm:text-5xl font-black leading-tight">

                Building Smarter
                <span className="block text-zinc-400 mt-2">
                  Learning Experiences
                </span>

              </h2>

            </div>

            <div className="space-y-6">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

                <h3 className="text-2xl font-bold">
                  Fully Responsive Platform
                </h3>

                <p className="text-zinc-300 mt-3 leading-relaxed">
                  Optimized for mobile phones, tablets, laptops,
                  and desktop devices for seamless learning.
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

                <h3 className="text-2xl font-bold">
                  Professional LMS System
                </h3>

                <p className="text-zinc-300 mt-3 leading-relaxed">
                  Secure educational ecosystem with courses,
                  certificates, enrollments, and smart dashboards.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PlatformStats;