import GuestLayout from "@/layouts/guest";
import Landing from "@/pages/landing";
import News from "@/pages/guests/news";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Articles from "@/pages/members/articles/articles";
import Article from "@/pages/members/articles/article";
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
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import Image from "@/pages/members/image";
import PlanetsPage from "@/pages/members/planets/planets-page";
import GalaxiesPage from "@/pages/members/galaxies/galaxies-page";
import SinnersPage from "@/pages/members/sinners/sinners-page";
import Tasks from "@/pages/members/tasks/tasks";
import Task from "@/pages/members/tasks/task";
import GroupImages from "@/pages/members/group-images";
import Observations from "@/pages/members/observations/observations";
import Observation from "@/pages/members/observations/observation";
import Equipments from "@/pages/members/equipments/equipments";
import Equipment from "@/pages/members/equipments/equipment";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/error-boundary-element";
import AuthLayout from "@/layouts/auth.layouts";

import Equipements from "@/pages/members/equipments/equipments";
import Equipement from "@/pages/members/equipments/equipment";
import Events from "@/pages/guests/events";

export default function AppRouter() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
        window.location.reload();
      }}
    >
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />

          {/* auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>

          <Route path="/guests" element={<GuestLayout />}>
            <Route path="news" element={<News />} />
            <Route path="articles" element={<Articles />} />
            <Route path="about" element={<About />} />
            <Route path="events" element={<Events />} />
          </Route>

          <Route path="/members" element={<DashboardLayout />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route index element={<MemberDashboard />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />

            {/* equipements routes */}
            <Route path="equipements" element={<Equipements />} />
            <Route path="equipements/:id" element={<Equipement />} />

            {/* observations router */}
            <Route path="observations" element={<Observations />} />
            <Route path="observations/:id" element={<Observation />} />

            {/* observations router */}
            <Route path="equipments" element={<Equipments />} />
            <Route path="equipments/:id" element={<Equipment />} />

            {/* all the routes of the images parent */}
            <Route path="images" element={<Images />} />
            <Route path="images/:id" element={<Image />} />
            {/* other  */}
            <Route path="images/planets" element={<PlanetsPage />} />
            <Route path="images/galaxies" element={<GalaxiesPage />} />
            <Route path="images/sinners" element={<SinnersPage />} />

            {/* dynamic images/:groun-name */}
            <Route path="images/groups/:groupName" element={<GroupImages />} />

            {/* tasks routes */}
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/:id" element={<Task />} />

            {/* tasks routes */}
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:id" element={<Article />} />

            {/* other pages of the members */}
            <Route path="groups" element={<Groups />} />
            <Route path="collaborators" element={<Collaborators />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
