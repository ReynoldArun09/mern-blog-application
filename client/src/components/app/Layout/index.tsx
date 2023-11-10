import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
}
