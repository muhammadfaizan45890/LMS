import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Award,
  GraduationCap,
  CheckCircle2,
  Clock3,
  Sparkles,
  FileText,
  Send,
  Search,
  ShieldCheck,
  Download,
  BadgeCheck,
} from "lucide-react";

const ApplyCertificate = () => {
  // ================= STATES =================
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");
  const [, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [applications, setApplications] = useState([]);

  // ================= USER =================
  const userId = localStorage.getItem("userId");

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/enroll/my-courses/${userId}`
      );

      const completedCourses = (res.data || []).filter(
        (item) => item.status === "active"
      );

      setCourses(completedCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH APPLICATIONS =================
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/certificate/user/${userId}`
      );

      setApplications(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCourses();
      fetchApplications();
    }
  }, []);

  // ================= APPLY =================
  const applyCertificate = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post(
        "http://localhost:8000/certificate/apply",
        {
          userId,
          courseId: selectedCourse,
          message,
        }
      );

      alert("Certificate application submitted");

      setSelectedCourse("");
      setMessage("");

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
          <div className="max-w-4xl">
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-white/10
                border border-white/10
                backdrop-blur-xl
                px-5 py-2
                rounded-full
                text-sm
                mb-8
              "
            >
              <Sparkles size={16} />
              Professional Certificate System
            </div>

            {/* HEADING */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-black
                leading-tight
                tracking-tight
              "
            >
              Apply For Certificate

              <span className="block text-zinc-400 mt-2">
                Get Your Official Learning Certificate
              </span>
            </h1>

            {/* DESC */}
            <p className="mt-8 text-zinc-300 text-lg leading-relaxed max-w-2xl">
              Submit your certificate request after course completion
              and track approval status directly from your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* ================= LEFT SIDE ================= */}
          <div
            className="
              bg-white
              border border-zinc-200
              rounded-[35px]
              p-6 sm:p-8
              shadow-sm
            "
          >
            {/* HEADER */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="
                  w-16 h-16
                  rounded-3xl
                  bg-black
                  text-white
                  flex items-center justify-center
                "
              >
                <Award size={30} />
              </div>

              <div>
                <h2 className="text-3xl font-black text-black">
                  Certificate Request
                </h2>

                <p className="text-zinc-500 mt-1">
                  Apply for your course completion certificate
                </p>
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={applyCertificate}
              className="space-y-6"
            >
              {/* COURSE */}
              <div>
                <label className="text-sm font-semibold text-zinc-700 block mb-3">
                  Select Course
                </label>

                <div className="relative">
                  <GraduationCap
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <select
                    value={selectedCourse}
                    onChange={(e) =>
                      setSelectedCourse(e.target.value)
                    }
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border border-zinc-200
                      bg-zinc-50
                      pl-14 pr-5
                      outline-none
                      focus:border-black
                      transition-all duration-300
                    "
                  >
                    <option value="">
                      Select completed course
                    </option>

                    {courses.map((item) => (
                      <option
                        key={item._id}
                        value={item.courseId?._id}
                      >
                        {item.courseId?.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm font-semibold text-zinc-700 block mb-3">
                  Application Message
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-5 top-5 text-zinc-500"
                  />

                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    placeholder="Write your certificate request..."
                    className="
                      w-full
                      rounded-3xl
                      border border-zinc-200
                      bg-zinc-50
                      pl-14 pr-5 py-5
                      outline-none
                      resize-none
                      focus:border-black
                      transition-all duration-300
                    "
                  />
                </div>
              </div>

              {/* INFO CARD */}
              <div
                className="
                  bg-zinc-50
                  border border-zinc-200
                  rounded-3xl
                  p-5
                  flex items-start gap-4
                "
              >
                <ShieldCheck
                  size={24}
                  className="text-black mt-1"
                />

                <div>
                  <h3 className="font-bold text-black">
                    Verification Process
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                    Admin will verify your course completion before
                    approving the certificate request.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-black
                  hover:bg-zinc-800
                  text-white
                  font-semibold
                  flex items-center justify-center gap-3
                  transition-all duration-300
                  disabled:opacity-50
                "
              >
                {submitting ? (
                  <>
                    <Clock3 size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Apply For Certificate
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div
            className="
              bg-white
              border border-zinc-200
              rounded-[35px]
              p-6 sm:p-8
              shadow-sm
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-black text-black">
                  My Applications
                </h2>

                <p className="text-zinc-500 mt-2">
                  Track all certificate requests
                </p>
              </div>

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-black
                  text-white
                  flex items-center justify-center
                "
              >
                <Search size={24} />
              </div>
            </div>

            {/* APPLICATIONS */}
            <div className="space-y-5">
              {applications.length === 0 ? (
                <div
                  className="
                    border border-dashed border-zinc-300
                    rounded-3xl
                    p-12
                    text-center
                  "
                >
                  <Award
                    size={52}
                    className="mx-auto text-zinc-400"
                  />

                  <h3 className="text-2xl font-bold mt-5">
                    No Applications Yet
                  </h3>

                  <p className="text-zinc-500 mt-3">
                    Your certificate applications will appear here.
                  </p>
                </div>
              ) : (
                applications.map((item) => (
                  <div
                    key={item._id}
                    className="
                      border border-zinc-200
                      rounded-3xl
                      p-6
                      hover:shadow-lg
                      transition-all duration-300
                    "
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-xl font-bold text-black">
                          {item.courseTitle || "Course"}
                        </h3>

                        <p className="text-zinc-500 mt-3 leading-relaxed">
                          {item.message}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div
                        className={`
                          px-4 py-2 rounded-full text-sm font-bold
                          ${
                            item.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {item.status || "pending"}
                      </div>
                    </div>

                    {/* DATE */}
                    <div className="mt-5 flex items-center gap-3 text-zinc-500 text-sm">
                      <Clock3 size={16} />

                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>

                    {/* APPROVED */}
                    {item.status === "approved" && (
                      <div
                        className="
                          mt-5
                          bg-green-50
                          border border-green-200
                          rounded-2xl
                          p-4
                          flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                        "
                      >
                        <div className="flex items-center gap-3">
                          <BadgeCheck
                            size={22}
                            className="text-green-600"
                          />

                          <p className="text-green-700 text-sm font-medium">
                            Certificate approved successfully.
                          </p>
                        </div>

                        <button
                          className="
                            h-11 px-5
                            rounded-xl
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            text-sm font-semibold
                            flex items-center justify-center gap-2
                            transition-all duration-300
                          "
                        >
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyCertificate;