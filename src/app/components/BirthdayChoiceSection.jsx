"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

export default function BirthdayChoiceSection() {
  const [answer, setAnswer] = useState("");
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChoice = (choice) => {
    setAnswer(choice);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="mt-16 text-center">
      <p className="text-3xl font-pacifico text-pink-700 mb-4">
        Alright, Birthday guuuuurl — Time for One or Two! 🎉
      </p>
      <p className="text-lg text-gray-700 mb-6 font-fredoka">
        Would you rather get...
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
        <motion.button
          whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
          className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
          onClick={() => handleChoice("food")}
        >
          🍔 A fancy dinner (your pick!)
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: [0, 3, -3, 0] }}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
          onClick={() => handleChoice("gift")}
        >
          🎁 A surprise gift (no peeking!)
        </motion.button>
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti width={width} height={height} />}

      <AnimatePresence>
        {answer === "food" && (
          <motion.div
            key="food"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8"
          >
            <p className="text-xl text-amber-700 font-semibold mb-4">
              🍽️ Lol you never tire to dey chop shaa. Gotcha b.
            </p>
            <img
              src="foodie.jpeg"
              alt="Fancy dinner"
              className="mx-auto rounded-xl w-72 shadow-lg"
            />
          </motion.div>
        )}

        {answer === "gift" && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8"
          >
            <p className="text-xl text-purple-600 font-semibold mb-4">
              🎉 Lol Stay Ready then, cutie!
            </p>
            <img
              src="/gift2.jpeg"
              alt="Surprise Gift"
              className="mx-auto rounded-xl w-60 shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {answer === "" && (
        <div className="mt-10 text-sm text-gray-500 italic animate-pulse">
          Can’t decide? 🎡 You might just get *both* 😉
        </div>
      )}
    </div>
  );
}
