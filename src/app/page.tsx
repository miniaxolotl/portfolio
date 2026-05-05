"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Sidebar />
      <main id="main-content" className="pt-14 md:pt-14 md:pl-72" tabIndex={-1}>
        <About />
        <Skills />
        <Projects />
        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
