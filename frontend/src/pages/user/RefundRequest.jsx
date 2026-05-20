import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";

import {
  Wallet,
  GraduationCap,
  BadgeDollarSign,
  CircleAlert,
  Send,
  CheckCircle2,
  Clock3,
  Search,
  Sparkles,
  FileText,
} from "lucide-react";

const RefundRequest = () => {
  // ================= STATES =================
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [reason, setReason] = useState("");
  const [, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [requests, setRequests] = useState([]);

  // ================= USER =================
  const userId = localStorage.getItem("userId");

  // ================= FETCH ENROLLED COURSES =================
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

  // ================= FETCH REQUESTS =================
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${API}/refund/user/${userId}`
      );

      setRequests(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCourses();
      fetchRequests();
    }
  }, []);

  // ================= SUBMIT REFUND =================
const submitRefund = async (e) => {
  e.preventDefault();

  if (!selectedCourse || !reason) {
    alert("Please fill all fields");
    return;
  }

  // ✅ CHECK: already applied refund for same course
  const alreadyApplied = requests.some(
    (req) =>
      req.courseId === selectedCourse &&
      req.status !== "rejected" // allow again only if previous was rejected
  );

  if (alreadyApplied) {
    alert("You have already applied for refund for this course.");
    return;
  }

  try {
    setSubmitting(true);

    await axios.post("${API}/refund/create", {
      userId,
      courseId: selectedCourse,
      reason,
    });

    alert("Refund request submitted successfully");

    setSelectedCourse("");
    setReason("");

    fetchRequests();
  } catch (error) {
    console.log(error);
    alert("Failed to submit refund request");
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
              Student Support & Refund Center
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
              Refund Requests

              <span className="block text-zinc-400 mt-2">
                Fast & Secure Refund System
              </span>
            </h1>

            {/* DESC */}
            <p className="mt-8 text-zinc-300 text-lg leading-relaxed max-w-2xl">
              Submit refund requests for enrolled courses and track
              approval status directly from your dashboard.
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
                <Wallet size={30} />
              </div>

              <div>
                <h2 className="text-3xl font-black text-black">
                  Request Refund
                </h2>

                <p className="text-zinc-500 mt-1">
                  Fill the form below to contact admin
                </p>
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={submitRefund}
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
                      Select enrolled course
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

              {/* REASON */}
              <div>
                <label className="text-sm font-semibold text-zinc-700 block mb-3">
                  Refund Reason
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-5 top-5 text-zinc-500"
                  />

                  <textarea
                    rows={6}
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    placeholder="Explain why you want a refund..."
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

              {/* WARNING */}
              <div
                className="
                  bg-yellow-50
                  border border-yellow-200
                  rounded-2xl
                  p-5
                  flex items-start gap-4
                "
              >
                <CircleAlert
                  size={22}
                  className="text-yellow-600 mt-1"
                />

                <div>
                  <h3 className="font-bold text-yellow-700">
                    Important Notice
                  </h3>

                  <p className="text-sm text-yellow-600 mt-1 leading-relaxed">
                    Refund approval depends on admin review and
                    refund policy.
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
                    Submit Refund Request
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
                  My Requests
                </h2>

                <p className="text-zinc-500 mt-2">
                  Track all submitted refund requests
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

            {/* REQUESTS */}
            <div className="space-y-5">
              {requests.length === 0 ? (
                <div
                  className="
                    border border-dashed border-zinc-300
                    rounded-3xl
                    p-12
                    text-center
                  "
                >
                  <BadgeDollarSign
                    size={48}
                    className="mx-auto text-zinc-400"
                  />

                  <h3 className="text-2xl font-bold mt-5">
                    No Refund Requests
                  </h3>

                  <p className="text-zinc-500 mt-3">
                    Your submitted refund requests will appear here.
                  </p>
                </div>
              ) : (
                requests.map((item) => (
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
                          {item.reason}
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
                          flex items-center gap-3
                        "
                      >
                        <CheckCircle2
                          size={20}
                          className="text-green-600"
                        />

                        <p className="text-green-700 text-sm font-medium">
                          Your refund request has been approved.
                        </p>
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

export default RefundRequest;