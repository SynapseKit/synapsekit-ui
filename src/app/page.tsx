import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import Comparison from "@/components/sections/Comparison";
import Capabilities from "@/components/sections/Capabilities";
import EvalCI from "@/components/sections/EvalCI";
import Ecosystem from "@/components/sections/Ecosystem";
import Install from "@/components/sections/Install";
import Docs from "@/components/sections/Docs";
import AnimatedDemo from "@/components/sections/AnimatedDemo";
import Architecture from "@/components/sections/Architecture";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AnimatedDemo />
        <Architecture />
        <Problem />
        <Solution />
        <Features />
        <Comparison />
        <Capabilities />
        <EvalCI />
        <Ecosystem />
        <Install />
        <Docs />
      </main>
      <Footer />
    </>
  );
}
