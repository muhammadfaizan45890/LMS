import React, { useEffect, useState } from "react"
import axios from "axios"

const AdminDashboard = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true)

      const res = await axios.get("http://localhost:8000/admin/users")

      setUsers(res.data)
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // ================= DELETE USER =================
  const deleteUser = async (id, role) => {
    try {
      if (role === "admin") {
        alert("Admin cannot be deleted")
        return
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      )

      if (!confirmDelete) return

      await axios.delete(`http://localhost:8000/admin/user/${id}`)

      // instant UI update
      setUsers((prev) => prev.filter((u) => u._id !== id))

    } catch (error) {
      console.log(error.response?.data?.message || error.message)
    }
  }

  // ================= FILTER LOGIC =================
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())

    const matchRole =
      filter === "all" ? true : user.role === filter

    return matchSearch && matchRole
  })

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen text-black">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-2xl sm:text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Total Users: {users.length}
        </p>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-full md:w-1/3"
        />

        {/* FILTER */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg w-full md:w-1/4"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>

        {/* REFRESH */}
        <button
          onClick={fetchUsers}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="text-center font-bold py-10">
          Loading users...
        </div>
      ) : (

        /* ================= TABLE ================= */
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] border border-gray-300">

            {/* HEADER */}
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Logged In</th>
                <th className="p-3">Google ID</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="text-center border hover:bg-gray-100 transition"
                  >
                    <td className="p-3 font-medium">
                      {user.username || "N/A"}
                    </td>

                    <td className="p-3">
                      {user.email}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3">
                      {user.isVerified ? "Yes" : "No"}
                    </td>

                    <td className="p-3">
                      {user.isLoggedIn ? "Yes" : "No"}
                    </td>

                    <td className="p-3">
                      {user.googleId || "N/A"}
                    </td>

                    <td className="p-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      <button
                        onClick={() =>
                          deleteUser(user._id, user.role)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      )}

    </div>
  )
}

export default AdminDashboard