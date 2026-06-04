import { useEffect, useState } from "react";
import { siteConfig } from "../../config/site.config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const navbarHeight = 56;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <nav
      className="nav"
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(200, 200, 200, 0.3)"
          : "1px solid rgba(200, 200, 200, 0.1)",
        boxShadow: scrolled ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none"
      }}
    >
      <div className="nav-inner">
        <button className="brand" onClick={() => scrollToSection("about")} type="button">
          {siteConfig.browserTitle}
        </button>
        <div className="nav-links">
          <button onClick={() => scrollToSection("about")} type="button">
            About
          </button>
          <button onClick={() => scrollToSection("experience")} type="button">
            Experience
          </button>
          <button onClick={() => scrollToSection("projects")} type="button">
            Projects
          </button>
          <button onClick={() => scrollToSection("gaming")} type="button">
            Gaming
          </button>
        </div>
      </div>
    </nav>
  );
}
