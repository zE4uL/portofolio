import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import AITeaser from "@/components/sections/AITeaser";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <AITeaser />
        <Contact />
      </main>
    </>
  );
}
