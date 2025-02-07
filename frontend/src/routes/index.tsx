import GuestLayout from "@/layouts/guest";
import Landing from "@/pages/landing";
import News from "@/pages/news";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        {/* <Route path="/guests">
          <Route index element={<Guests />} />
          <Route path="articles" element={<Articles />} />
        </Route> */}

        <Route path="/guests" element={<GuestLayout />}>
          <Route path="news" element={<News />} />
          {/* <Route index element={<LandingPage />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}
