import React from "react";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Users,
  Zap,
  Target,
  Award,
  Globe,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-100 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative bg-black text-white overflow-hidden">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles size={16} />
              About Our Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Smarter Learning
              <span className="block text-zinc-400 mt-2">
                Built For The Future
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
              We are building a modern AI-powered Learning Management System
              where students can learn, track progress, and access secure
              educational content anytime, anywhere.
            </p>

          </div>

        </div>

      </section>

      {/* ================= MISSION ================= */}
      <section className="px-4 sm:px-6 lg:px-10 py-14">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          <div className="bg-white border border-zinc-200 rounded-[35px] p-8 shadow-sm">

            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-6">
              <Target size={26} />
            </div>

            <h2 className="text-3xl font-black text-black">
              Our Mission
            </h2>

            <p className="text-zinc-600 mt-5 leading-relaxed">
              Our mission is to make education simple, accessible, and
              intelligent. We aim to empower students with tools that help
              them learn faster, stay organized, and achieve better results
              through structured digital learning.
            </p>

          </div>

          <div className="bg-white border border-zinc-200 rounded-[35px] p-8 shadow-sm">

            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-6">
              <Globe size={26} />
            </div>

            <h2 className="text-3xl font-black text-black">
              Our Vision
            </h2>

            <p className="text-zinc-600 mt-5 leading-relaxed">
              We believe in a future where learning is not limited by time,
              place, or resources. Our platform is designed to bring world-class
              education to every student with simplicity and technology.
            </p>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-4 sm:px-6 lg:px-10 py-10">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-black">
              Why Choose Us
            </h2>
            <p className="text-zinc-500 mt-3">
              Built with modern tools for better learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* CARD */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <BookOpen size={22} />
              </div>
              <h3 className="text-xl font-bold">Structured Courses</h3>
              <p className="text-zinc-500 mt-2">
                Well-organized modules for easy learning.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-bold">Secure Platform</h3>
              <p className="text-zinc-500 mt-2">
                Role-based access and data protection.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <Zap size={22} />
              </div>
              <h3 className="text-xl font-bold">Fast Performance</h3>
              <p className="text-zinc-500 mt-2">
                Optimized for speed and smooth experience.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <Users size={22} />
              </div>
              <h3 className="text-xl font-bold">Student Focused</h3>
              <p className="text-zinc-500 mt-2">
                Designed for better student engagement.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">

        <div className="max-w-5xl mx-auto bg-black text-white rounded-[40px] p-10 text-center relative overflow-hidden">

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

          <div className="relative">

            <Award size={50} className="mx-auto mb-6" />

            <h2 className="text-3xl sm:text-4xl font-black">
              Start Your Learning Journey Today
            </h2>

            <p className="text-zinc-300 mt-4">
              Join thousands of students already learning smarter with our platform.
            </p>

            <button className="mt-8 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-zinc-200 transition">
              Get Started
            </button>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;