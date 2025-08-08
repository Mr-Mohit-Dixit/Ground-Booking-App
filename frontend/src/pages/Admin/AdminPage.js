// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminNavbar from "../../components/AdminNavbar";
// import AdminSidebar from "../../components/AdminSidebar";
// import Dashboard from "./Dashboard";
// import ViewUsers from "./ViewUsers";
// import ViewGrounds from "./ViewGrounds";
// import Reports from "./Reports";

// const AdminPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Navbar fixed at the top */}
//       <header className="shadow z-10">
//         <AdminNavbar />
//       </header>

//       <div className="flex flex-1">
//         {/* Sidebar fixed on the left */}
//         <aside className="w-64 bg-white border-r shadow-lg">
//           <AdminSidebar />
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Routes>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="users" element={<ViewUsers />} />
//             <Route path="grounds" element={<ViewGrounds />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="*" element={<Navigate to="" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const AdminPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="shadow z-10">
        <AdminNavbar />
      </header>

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shadow-lg">
          <AdminSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Only this part changes */}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
