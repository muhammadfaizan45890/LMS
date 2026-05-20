import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";

import {
  Wallet,
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  Sparkles,
  Users,
  GraduationCap,
  BadgeDollarSign,
  RefreshCcw,
} from "lucide-react";

const AdminRefund = () => {
  // ================= STATES =================
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [updatingId, setUpdatingId] =
    useState("");

  // ================= FETCH REFUNDS =================
  const fetchRefunds = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "${API}/refund/all"
      );

      setRefunds(res.data || []);
      setFilteredRefunds(res.data || []);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {

    const filtered = refunds.filter((item) =>
      item.courseTitle
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredRefunds(filtered);

  }, [search, refunds]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (
    refundId,
    status
  ) => {
    try {

      setUpdatingId(refundId);

      await axios.put(
        `${API}/refund/update/${refundId}`,
        {
          status,
        }
      );

      fetchRefunds();

    } catch (error) {

      console.log(error);

      alert("Failed to update refund");

    } finally {

      setUpdatingId("");

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

              Refund Management System

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
              Admin Refund Panel

              <span className="block text-zinc-400 mt-2">
                Manage Student Refund Requests
              </span>

            </h1>

            {/* DESC */}
            <p className="mt-8 text-zinc-300 text-lg leading-relaxed max-w-2xl">

              Review refund requests, approve or reject student
              submissions, and manage refund activities securely.

            </p>

          </div>

        </div>

      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative px-4 sm:px-6 lg:px-10 py-12">

        <div className="max-w-7xl mx-auto">

          {/* ================= TOP BAR ================= */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

            {/* LEFT */}
            <div>

              <h2 className="text-3xl sm:text-4xl font-black text-black">
                Refund Requests
              </h2>

              <p className="text-zinc-500 mt-3 text-lg">
                Track and manage all student refund requests.
              </p>

            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[400px]">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Search by course title..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border border-zinc-200
                  bg-white
                  pl-14 pr-5
                  outline-none
                  focus:border-black
                "
              />

            </div>

          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {/* TOTAL */}
            <div className="bg-white border border-zinc-200 rounded-[30px] p-6">

              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <Wallet size={28} />
              </div>

              <h2 className="text-4xl font-black mt-6">
                {refunds.length}
              </h2>

              <p className="text-zinc-500 mt-2">
                Total Requests
              </p>

            </div>

            {/* APPROVED */}
            <div className="bg-white border border-zinc-200 rounded-[30px] p-6">

              <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>

              <h2 className="text-4xl font-black mt-6">

                {
                  refunds.filter(
                    (item) =>
                      item.status === "approved"
                  ).length
                }

              </h2>

              <p className="text-zinc-500 mt-2">
                Approved
              </p>

            </div>

            {/* REJECTED */}
            <div className="bg-white border border-zinc-200 rounded-[30px] p-6">

              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center">
                <XCircle size={28} />
              </div>

              <h2 className="text-4xl font-black mt-6">

                {
                  refunds.filter(
                    (item) =>
                      item.status === "rejected"
                  ).length
                }

              </h2>

              <p className="text-zinc-500 mt-2">
                Rejected
              </p>

            </div>

            {/* PENDING */}
            <div className="bg-white border border-zinc-200 rounded-[30px] p-6">

              <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-white flex items-center justify-center">
                <Clock3 size={28} />
              </div>

              <h2 className="text-4xl font-black mt-6">

                {
                  refunds.filter(
                    (item) =>
                      item.status === "pending"
                  ).length
                }

              </h2>

              <p className="text-zinc-500 mt-2">
                Pending
              </p>

            </div>

          </div>

          {/* ================= REFUNDS ================= */}
          {loading ? (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="
                    h-[280px]
                    rounded-[35px]
                    bg-white
                    border border-zinc-200
                    animate-pulse
                  "
                />
              ))}

            </div>

          ) : filteredRefunds.length === 0 ? (

            <div
              className="
                bg-white
                border border-zinc-200
                rounded-[35px]
                p-14
                text-center
              "
            >

              <BadgeDollarSign
                size={60}
                className="mx-auto text-zinc-400"
              />

              <h2 className="text-3xl font-black mt-6">
                No Refund Requests
              </h2>

              <p className="text-zinc-500 mt-4">
                Refund requests will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {filteredRefunds.map((item) => (

                <div
                  key={item._id}
                  className="
                    bg-white
                    border border-zinc-200
                    rounded-[35px]
                    p-7
                    hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                    transition-all duration-500
                  "
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <h2 className="text-2xl font-black text-black">
                        {item.courseTitle}
                      </h2>

                      <div className="flex items-center gap-3 mt-4 text-zinc-500">

                        <Users size={18} />

                        <span>
                          {item.userId?.username ||
                            "Student"}
                        </span>

                      </div>

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
                      {item.status}
                    </div>

                  </div>

                  {/* REASON */}
                  <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-3xl p-5">

                    <div className="flex items-center gap-3 mb-4">

                      <GraduationCap size={20} />

                      <h3 className="font-bold">
                        Refund Reason
                      </h3>

                    </div>

                    <p className="text-zinc-600 leading-relaxed">
                      {item.reason}
                    </p>

                  </div>

                  {/* DATE */}
                  <div className="mt-5 flex items-center gap-3 text-zinc-500">

                    <Clock3 size={18} />

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </div>

                  {/* ACTIONS */}
                  {item.status === "pending" && (

                    <div className="grid grid-cols-2 gap-4 mt-8">

                      {/* APPROVE */}
                      <button
                        onClick={() =>
                          updateStatus(
                            item._id,
                            "approved"
                          )
                        }
                        disabled={
                          updatingId === item._id
                        }
                        className="
                          h-14
                          rounded-2xl
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          font-semibold
                          transition-all duration-300
                        "
                      >
                        {updatingId === item._id ? (
                          <RefreshCcw className="animate-spin mx-auto" />
                        ) : (
                          "Approve"
                        )}
                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() =>
                          updateStatus(
                            item._id,
                            "rejected"
                          )
                        }
                        disabled={
                          updatingId === item._id
                        }
                        className="
                          h-14
                          rounded-2xl
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          font-semibold
                          transition-all duration-300
                        "
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default AdminRefund;