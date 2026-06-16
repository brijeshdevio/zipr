import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
} from "react-router-dom";

import { Landing } from "@/pages/Landing";
import { Signup } from "@/pages/Signup";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { Analytics } from "@/pages/Analytics";
import { NotFound } from "@/pages/NotFound";
import { Redirect } from "@/pages/Redirect";
import { ShortLinkNotFound } from "@/pages/ShortLinkNotFound";

export function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/link/:id/analytics" element={<Analytics />} />
        <Route path="/r/:shortCode" element={<Redirect />} />
        <Route path="/link-not-found" element={<ShortLinkNotFound />} />
        <Route path="*" element={<NotFound />} />
      </RoutesWrapper>
    </BrowserRouter>
  );
}
