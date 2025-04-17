"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import BirthdayChoiceSection from "./components/BirthdayChoiceSection";

const images = [
  "/grace1.JPG",
  "/grace2.jpg",
  "/grace3.jpg",
  // Add your images to the /public folder
];

export default function BirthdayPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);

  // Autoplay background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. User interaction required.");
      });
    }
  }, []);

  // Autoplay image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleYes = () => {
    setAnswer("yes");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleNo = () => setAnswer("no");

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <audio ref={audioRef} loop src="/birthday-song.mp3" />

      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <motion.h1
        className="text-4xl md:text-6xl font-bold text-purple-900 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Happy Birthday, Graceyy! 🎂
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-pink-600 max-w-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Here’s to you! Your smile, your energy, your shyness, lol and the joy
        you bring 💖
      </motion.p>

      <button
        onClick={() => setShowModal(true)}
        className="mb-10 px-6 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg transition"
      >
        💌 Read Note Achalugo.
      </button>

      {/* Image Slider */}
      <div className="relative w-full max-w-md">
        <Image
          src={images[currentImage]}
          alt={`Memory ${currentImage + 1}`}
          width={400}
          height={300}
          className="rounded-xl shadow-xl object-cover w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prevImage}
            className="text-3xl text-white font-bold hover:text-yellow-300"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="text-3xl text-white font-bold hover:text-yellow-300"
          >
            ›
          </button>
        </div>
      </div>

      <section className="mt-8">
        <BirthdayChoiceSection />
      </section>

      {/* Love Note Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-2">
              💌 A Note From Odogwu
            </h2>
            <p className="text-gray-700">
              You are one of the most incredible people I've ever met. Your
              energy lights up every room and I feel lucky just to know you. I
              hope this birthday makes you feel as special as you truly are 💖.
              Happy Birthday Gum Drop. PS; you're lucky those birthday pictures
              you sent yesterday were "View once". Lol.
            </p>
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
