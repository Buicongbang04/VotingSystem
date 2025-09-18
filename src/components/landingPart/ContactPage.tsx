"use client";

import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const today = new Date();

    const october10th = new Date();
    october10th.setMonth(9); // October (0-based)
    october10th.setDate(10);
    october10th.setHours(23, 59, 59, 999);

    const isAfterOctober10th = today > october10th;

    if (!isAfterOctober10th) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // target: 10/11 + 30 days (giữ nguyên logic của bạn)
    const targetDate = new Date();
    targetDate.setMonth(10); // November
    targetDate.setDate(10);
    targetDate.setHours(23, 59, 59, 999);
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = Date.now();
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

  // Responsive circle size
  const [circleSize, setCircleSize] = useState(200);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setCircleSize(120);
      else if (width < 1024) setCircleSize(160);
      else setCircleSize(200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="contact"
      className="
        bg-contact
        min-h-dvh flex flex-col items-center justify-center snap-section relative
        px-4 sm:px-6 lg:px-8
        w-full max-w-[100vw]
        overflow-x-hidden overflow-x-clip overflow-y-visible
      "
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-pink-400/30 rounded-full opacity-20"></div>
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-cyan-400/30 opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-pink-400/30 opacity-20 transform rotate-12"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-purple-400/30 rounded-full opacity-20"></div>

      {/* Nội dung */}
      <div className="relative z-10 w-full min-w-0">
        {/* Main Title */}
        <div className="mb-12">
          <h2
            className="
              text-center font-bold text-white leading-tight mb-4
              text-[clamp(1.75rem,5vw,3.5rem)]
              break-words whitespace-normal [text-wrap:balance]
              max-w-[90%] md:max-w-4xl mx-auto
            "
            style={{
              textShadow:
                "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)",
            }}
          >
            THỜI GIAN CÒN LẠI
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-6 w-full min-w-0">
          {timeUnits.map((unit, idx) => (
            <Circle
              key={idx}
              value={unit.value}
              label={unit.label}
              size={circleSize}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type HUDCircleProps = {
  size?: number;
  color?: string;
  value?: string | number;
  label?: string;
};

const Circle: React.FC<HUDCircleProps> = ({
  size = 200,
  color = "#ff64d8",
  value,
  label,
}) => {
  const cx = size / 2;
  const cy = size / 2;

  const rOuter = size * 0.46;
  const rOuterThin = size * 0.44;
  const rDots = size * 0.41;
  const rDashed = size * 0.36;
  const rInner = size * 0.33;

  const C = 2 * Math.PI * rOuter;
  const seg = 0.2;
  const gap = 0.05;
  const segLen = C * seg;
  const gapLen = C * gap;
  const remaining = C - 4 * (segLen + gapLen);
  const dashArrayOuter = [
    segLen,
    gapLen,
    segLen,
    gapLen,
    segLen,
    gapLen,
    segLen,
    gapLen + Math.max(0, remaining),
  ].join(",");

  const C2 = 2 * Math.PI * rDashed;
  const long = C2 * 0.02;
  const short = C2 * 0.008;
  const gap2 = C2 * 0.012;
  const pattern = Array.from({ length: 60 })
    .map((_, i) => (i % 3 === 0 ? `${long},${gap2}` : `${short},${gap2}`))
    .join(",");

  const anchorDots = [0, 90, 180, 270].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const x = cx + rDots * Math.cos(rad);
    const y = cy + rDots * Math.sin(rad);
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size * 0.008}
        fill={color}
        opacity={0.9}
      />
    );
  });

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        <circle
          cx={cx}
          cy={cy}
          r={rOuter}
          fill="none"
          stroke={color}
          strokeOpacity="0.95"
          strokeWidth={size * 0.018}
          strokeLinecap="round"
          strokeDasharray={dashArrayOuter}
          transform={`rotate(-20 ${cx} ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={rOuterThin}
          fill="none"
          stroke={color}
          strokeOpacity="0.35"
          strokeWidth={size * 0.006}
        />
        {anchorDots}
        <circle
          cx={cx}
          cy={cy}
          r={rDashed}
          fill="none"
          stroke={color}
          strokeOpacity="0.9"
          strokeWidth={size * 0.012}
          strokeDasharray={pattern}
          strokeLinecap="round"
          transform={`rotate(-10 ${cx} ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill="none"
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth={size * 0.005}
        />
        {value !== undefined && value !== null && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: size * 0.16,
              fontWeight: 800,
              fill: "#ffffff",
            }}
          >
            {String(value).padStart(2, "0")}
          </text>
        )}
      </svg>
      {label && (
        <span
          className="mt-2 font-bold text-white break-words whitespace-normal"
          style={{
            textShadow: "0 0 6px rgba(255,255,255,0.4)",
            fontSize: Math.max(12, size * 0.09),
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default ContactPage;
