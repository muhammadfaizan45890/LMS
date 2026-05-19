import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const AdminUsers = () => {

  // ================= STATE =================
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= SEARCH =================
  const [search, setSearch] = useState("");

  // ================= FETCH ENROLLMENTS =================
  const fetchEnrollments = async () => {

    try {

      setLoading(true);
      setError(null);

      const res = await axios.get(
        "http://localhost:8000/enroll/all"
      );

      setEnrollments(res.data || []);

    } catch (err) {

      console.log(err);
      setError("Failed to load enrollments");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // ================= FILTERED ENROLLMENTS =================
  const filteredEnrollments = useMemo(() => {

    return enrollments.filter((item) => {

      const username =
        item.userId?.username?.toLowerCase() || "";

      const email =
        item.userId?.email?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      return (
        username.includes(searchText) ||
        email.includes(searchText)
      );
    });

  }, [enrollments, search]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:8000/enroll/status/${id}`,
        { status }
      );

      setEnrollments((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status }
            : item
        )
      );

    } catch (error) {

      console.log(error);
      alert("Failed to update status");

    }
  };

  // ================= DELETE ENROLLMENT =================
  const deleteEnrollment = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enrollment?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:8000/enroll/delete/${id}`
      );

      setEnrollments((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Enrollment deleted successfully");

    } catch (error) {

      console.log(error);
      alert("Failed to delete enrollment");

    }
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {

    switch (status) {

      case "active":
        return "bg-green-100 text-green-700 border border-green-200";

      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

      case "refund":
        return "bg-red-100 text-red-700 border border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}
      <div className="
        flex flex-col lg:flex-row
        lg:items-center lg:justify-between
        gap-4 mb-8
      ">

        <div>

          <h1 className="
            text-3xl sm:text-4xl
            font-bold text-zinc-900
          ">
            Enrollment Requests
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage all course enrollments
          </p>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="
          flex flex-col sm:flex-row
          gap-3 w-full lg:w-auto
        ">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full sm:w-[320px]
              px-5 py-3
              rounded-2xl
              border border-zinc-300
              bg-white
              outline-none
              focus:ring-2 focus:ring-black
              transition-all
            "
          />

          {/* REFRESH */}
          <button
            onClick={fetchEnrollments}
            className="
              bg-black text-white
              px-5 py-3
              rounded-2xl
              hover:bg-zinc-800
              transition-all duration-300
              shadow-lg
              whitespace-nowrap
            "
          >
            Refresh Data
          </button>

        </div>

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="
          bg-red-100 border border-red-200
          text-red-700
          px-4 py-3 rounded-2xl
          mb-6
        ">
          {error}
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading ? (

        <div className="
          bg-white rounded-3xl
          p-10 text-center
          shadow-lg
        ">
          <div className="text-2xl font-bold text-zinc-700">
            Loading enrollments...
          </div>
        </div>

      ) : filteredEnrollments.length === 0 ? (

        <div className="
          bg-white rounded-3xl
          p-10 text-center
          shadow-lg
        ">

          <div className="text-6xl mb-4">
            🔍
          </div>

          <h2 className="
            text-2xl font-bold
            text-zinc-900
          ">
            No Matching Results
          </h2>

          <p className="text-zinc-500 mt-3">
            Try searching with another username or email.
          </p>

        </div>

      ) : (

        <div className="
          bg-white rounded-3xl
          shadow-xl overflow-hidden
          border border-zinc-200
        ">

          <div className="overflow-x-auto">

            {/* ================= TABLE ================= */}
            <table className="w-full min-w-[1100px]">

              {/* ================= HEADER ================= */}
              <thead className="bg-black text-white">

                <tr>

                  <th className="p-4 text-left">
                    User
                  </th>

                  <th className="p-4 text-left">
                    Course
                  </th>

                  <th className="p-4 text-center">
                    Payment
                  </th>

                  <th className="p-4 text-center">
                    Status
                  </th>

                  <th className="p-4 text-center">
                    Enrolled At
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* ================= BODY ================= */}
              <tbody>

                {filteredEnrollments.map((item, index) => (

                  <tr
                    key={item._id}
                    className={`
                      border-b border-zinc-200
                      hover:bg-zinc-50
                      transition-all duration-200

                      ${index % 2 === 0
                        ? "bg-white"
                        : "bg-zinc-50/40"
                      }
                    `}
                  >

                    {/* USER */}
                    <td className="p-4">

                      <div>

                        <h3 className="font-semibold text-zinc-900">
                          {item.userId?.username || "N/A"}
                        </h3>

                        <p className="text-sm text-zinc-500">
                          {item.userId?.email || "No Email"}
                        </p>

                      </div>

                    </td>

                    {/* COURSE */}
                    <td className="p-4">

                      <div>

                        <h3 className="font-semibold text-zinc-900">
                          {item.courseId?.title || "N/A"}
                        </h3>

                        <p className="text-sm text-zinc-500 line-clamp-1">
                          {item.courseId?.description || "No Description"}
                        </p>

                      </div>

                    </td>

                    {/* PAYMENT */}
                    <td className="p-4 text-center">

                      <span className="
                        bg-zinc-100
                        px-3 py-2
                        rounded-xl
                        text-sm font-medium
                      ">
                        {item.paymentMethod || "N/A"}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="p-4 text-center">

                      <span
                        className={`
                          px-4 py-2 rounded-full
                          text-xs font-bold uppercase
                          ${getStatusStyle(item.status)}
                        `}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* DATE */}
                    <td className="
                      p-4 text-center
                      text-sm text-zinc-600
                    ">

                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "N/A"
                      }

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">

                      <div className="
                        flex flex-wrap
                        justify-center gap-2
                      ">

                        <button
                          disabled={item.status === "pending"}
                          onClick={() =>
                            updateStatus(item._id, "pending")
                          }
                          className="
                            px-3 py-2 text-xs
                            bg-yellow-500 text-white
                            rounded-xl
                            hover:bg-yellow-600
                            transition
                            disabled:opacity-40
                          "
                        >
                          Pending
                        </button>

                        <button
                          disabled={item.status === "active"}
                          onClick={() =>
                            updateStatus(item._id, "active")
                          }
                          className="
                            px-3 py-2 text-xs
                            bg-green-600 text-white
                            rounded-xl
                            hover:bg-green-700
                            transition
                            disabled:opacity-40
                          "
                        >
                          Active
                        </button>

                        <button
                          disabled={item.status === "refund"}
                          onClick={() =>
                            updateStatus(item._id, "refund")
                          }
                          className="
                            px-3 py-2 text-xs
                            bg-red-600 text-white
                            rounded-xl
                            hover:bg-red-700
                            transition
                            disabled:opacity-40
                          "
                        >
                          Refund
                        </button>

                        <button
                          onClick={() =>
                            deleteEnrollment(item._id)
                          }
                          className="
                            px-3 py-2 text-xs
                            bg-black text-white
                            rounded-xl
                            hover:bg-zinc-800
                            transition
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}
    </div>
  );
};

export default AdminUsers;