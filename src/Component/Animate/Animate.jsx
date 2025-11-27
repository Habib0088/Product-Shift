import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AwesomeCards() {
  const [cards, setCards] = useState([
    { id: 1, title: "Card One" },
    { id: 2, title: "Card Two" },
    { id: 3, title: "Card Three" },
  ]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };

  const addCard = () => {
    const newId = cards.length + 1;
    setCards([...cards, { id: newId, title: `Card ${newId}` }]);
  };

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Awesome Animated Cards</h1>

      <button
        onClick={addCard}
        style={{ marginBottom: "20px", padding: "10px 20px" }}
      >
        Add Card
      </button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              style={{
                width: "150px",
                height: "150px",
                background: "#ff5722",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                cursor: "grab",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              }}
              onDoubleClick={() =>
                setCards(cards.filter((c) => c.id !== card.id))
              }
            >
              {card.title}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        **Tip:** Drag cards, hover for effect, double-click to remove.
      </p>
    </div>
  );
}
