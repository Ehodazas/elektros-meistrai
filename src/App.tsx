import { Route, Routes } from "react-router";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Services from "./pages/Services.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import Projects from "./pages/Projects.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="paslaugos" element={<Services />} />
        <Route path="paslaugos/:slug" element={<ServiceDetail />} />
        <Route path="atlikti-darbai" element={<Projects />} />
        <Route path="apie-mus" element={<About />} />
        <Route path="kontaktai" element={<Contact />} />
        <Route path="privatumo-politika" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
