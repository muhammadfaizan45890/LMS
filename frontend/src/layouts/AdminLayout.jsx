import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '@/components/Navbar'
import AdminSidebar from '@/components/admin/AdminSidebar'

const AdminLayout = () => {
  return (
    <div>

      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex pt-14">

        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-zinc-100 p-6">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default AdminLayout