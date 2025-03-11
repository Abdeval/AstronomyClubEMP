import GuestLayout from "@/layouts/guest";
import Landing from "@/pages/landing";
import News from "@/pages/guests/news";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Articles from "@/pages/guests/articles";
import AdminDashboard from "@/pages/members/dashboard/AdminDashboard";
import MemberDashboard from "@/pages/members/dashboard/MemberDashboard";
import DashboardLayout from "@/layouts/dashboard";
import CalendarPage from "@/pages/members/calendar";
import Settings from "@/pages/members/settings";
import Profile from "@/pages/members/profile";
import Images from "@/pages/members/images";
import Groups from "@/pages/members/groups";
import Collaborators from "@/pages/members/collaborators";
import About from "@/pages/guests/about";


export default function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/guests" element={<GuestLayout />}>
          <Route path="news" element={<News />} />
          <Route path="articles" element={<Articles />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/members" element={<DashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />}/>
          <Route index element={<MemberDashboard />}/>
          <Route path="calendar" element={<CalendarPage />}/>
          <Route path="settings" element={<Settings />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="images" element={<Images />}/>
          <Route path="groups" element={<Groups />}/>
          <Route path="collaborators" element={<Collaborators />}/>
        </Route>
      </Routes>
    </Suspense>
  );
}
