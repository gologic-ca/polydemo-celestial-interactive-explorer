import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create starry background
    const createStars = () => {
      const container = document.querySelector(".solar-system");
      if (!container) return;
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = Math.random() * 3 + "px";
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDelay = Math.random() * 1 + "s";
        container.appendChild(star);
      }
    };

    createStars();
  }, []);

  const planets = [
    { name: "Mercury", color: "#A0522D", size: 20, orbit: 120 },
    { name: "Venus", color: "#DEB887", size: 25, orbit: 150 },
    { name: "Earth", color: "#4B9CD3", size: 30, orbit: 180 },
    { name: "Mars", color: "#CD5C5C", size: 22, orbit: 210 },
    { name: "Jupiter", color: "#DEB887", size: 50, orbit: 260 },
    { name: "Saturn", color: "#DAA520", size: 45, orbit: 310 },
    { name: "Uranus", color: "#87CEEB", size: 35, orbit: 360 },
    { name: "Neptune", color: "#4169E1", size: 35, orbit: 410 }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden solar-system">
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-24 h-24 bg-yellow-500 rounded-full planet cursor-pointer"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => navigate("/planet/sun")}
        >
          <div className="planet-info">Sun</div>
        </motion.div>
      </div>

      {/* Planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + index * 5, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute planet"
            style={{
              width: planet.size,
              height: planet.size,
              transform: `translateX(${planet.orbit}px)`,
            }}
            onClick={() => navigate(`/planet/${planet.name.toLowerCase()}`)}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: planet.color }}
            />
            <div className="planet-info">
              {planet.name}
            </div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Solar System</h1>
        <p className="text-gray-400">Click on any celestial body to learn more</p>
      </div>
    </div>
  );
};

export default Index;