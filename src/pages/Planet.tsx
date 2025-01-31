import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const planetData = {
  mercury: {
    name: "Mercury",
    description: "The smallest and innermost planet in the Solar System.",
    color: "#A0522D",
    facts: [
      "Closest planet to the Sun",
      "No moons",
      "Temperatures range from -180°C to 430°C",
      "Named after the Roman god of commerce"
    ]
  },
  venus: {
    name: "Venus",
    description: "Often called Earth's sister planet due to their similar size.",
    color: "#DEB887",
    facts: [
      "Hottest planet in our solar system",
      "Rotates backwards compared to most planets",
      "Similar in size to Earth",
      "Named after the Roman goddess of love"
    ]
  },
  earth: {
    name: "Earth",
    description: "Our home planet and the only known planet to harbor life.",
    color: "#4B9CD3",
    facts: [
      "Only planet known to have life",
      "Has one natural satellite - the Moon",
      "70% of surface covered in water",
      "Has a protective magnetic field"
    ]
  },
  mars: {
    name: "Mars",
    description: "Known as the Red Planet due to its reddish appearance.",
    color: "#CD5C5C",
    facts: [
      "Called the Red Planet",
      "Has two moons: Phobos and Deimos",
      "Home to the largest volcano in the solar system",
      "Named after the Roman god of war"
    ]
  },
  jupiter: {
    name: "Jupiter",
    description: "The largest planet in our Solar System.",
    color: "#DEB887",
    facts: [
      "Largest planet in our solar system",
      "Has the Great Red Spot storm",
      "Has at least 79 moons",
      "Named after the king of the Roman gods"
    ]
  },
  saturn: {
    name: "Saturn",
    description: "Famous for its prominent ring system.",
    color: "#DAA520",
    facts: [
      "Known for its spectacular rings",
      "Has 82 confirmed moons",
      "Could float in water due to its density",
      "Named after the Roman god of agriculture"
    ]
  },
  uranus: {
    name: "Uranus",
    description: "The first planet discovered using a telescope.",
    color: "#87CEEB",
    facts: [
      "Rotates on its side",
      "Has 27 known moons",
      "Coldest planetary atmosphere",
      "Named after the Greek god of the sky"
    ]
  },
  neptune: {
    name: "Neptune",
    description: "The windiest planet, with speeds reaching 2,100 km/h.",
    color: "#4169E1",
    facts: [
      "Most distant planet from the Sun",
      "Has 14 known moons",
      "Strongest winds in the solar system",
      "Named after the Roman god of the sea"
    ]
  }
};

const Planet = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const planet = planetData[name as keyof typeof planetData];

  if (!planet) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        Back to Solar System
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-8 mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 rounded-full"
            style={{ backgroundColor: planet.color }}
          />
          <div>
            <h1 className="text-5xl font-bold mb-4">{planet.name}</h1>
            <p className="text-xl text-gray-400">{planet.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planet.facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary p-6 rounded-lg"
            >
              {fact}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planet;