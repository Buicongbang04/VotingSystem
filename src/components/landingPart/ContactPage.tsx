"use client";

import React, { useState, useEffect } from "react";
import ScrollToElement from "../scroll-to-top-arrow";

const ContactPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if we're past October 10th
    const today = new Date();
    const october10th = new Date();
    october10th.setMonth(9); // October
    october10th.setDate(10);
    october10th.setHours(23, 59, 59, 999);

    const isAfterOctober10th = today > october10th;

    if (!isAfterOctober10th) {
      // If before or on October 10th, show zeros and don't start timer
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // Only run timer after October 10th has passed
    // Set target date (example: 30 days after October 10th)
    const targetDate = new Date();
    targetDate.setMonth(10); // November
    targetDate.setDate(10);
    targetDate.setHours(23, 59, 59, 999);
    targetDate.setDate(targetDate.getDate() + 30); // Add 30 days after Nov 10th

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Timer has reached zero
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "NGÀY" },
    { value: timeLeft.hours, label: "GIỜ" },
    { value: timeLeft.minutes, label: "PHÚT" },
    { value: timeLeft.seconds, label: "GIÂY" },
  ];

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 snap-section relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-pink-400/30 rounded-full opacity-20"></div>
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-cyan-400/30 opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-pink-400/30 opacity-20 transform rotate-12"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-purple-400/30 rounded-full opacity-20"></div>

      <div className="container mx-auto px-8 text-center relative z-10">
        {/* Main Title */}
        <div className="mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-8"
            style={{
              textShadow:
                "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)",
            }}
          >
            THỜI GIAN CÒN LẠI
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-16">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Timer Circle */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-pink-400/50 bg-transparent"></div>
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-pink-300/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-3xl sm:text-4xl font-bold text-white"
                    style={{
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Label */}
              <span
                className="text-white font-bold text-lg sm:text-xl"
                style={{
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
