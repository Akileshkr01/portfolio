import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ProofBar from "@/components/sections/ProofBar";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Testimonials from "@/components/sections/Testimonials";

const Projects = dynamic(() => import("@/components/sections/Projects"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Testimonials />
      <Contact />
    </>
  );
}
