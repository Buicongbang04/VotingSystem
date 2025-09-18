"use client";

import React, { useState, useEffect } from "react";
import TextBox from "../About/TextBox";
import Link from "next/link";
import QRCode from "qrcode";

const HeroPage = () => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setCurrentUrl(url);

    QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    }).then(setQrCodeDataUrl);
  }, []);

  const handleShareClick = () => setShowSharePopup(true);
  const handleClosePopup = () => setShowSharePopup(false);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link đã được sao chép!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <section
      id="hero"
      className="
        bg-hero
        min-h-dvh flex items-center justify-center snap-section
        px-4 sm:px-6 lg:px-8
        w-full max-w-[100vw]     /* nền phủ full, không vượt quá viewport */
        overflow-x-hidden overflow-x-clip overflow-y-visible
      "
    >
      {/* Khối nội dung full-width; text sẽ được giới hạn bằng khung bên trong */}
      <div className="w-full min-w-0">
        {/* Title */}
        <h1
          className="
            text-white font-bold text-center leading-tight
            mb-6
            text-[clamp(1.75rem,5vw,4.5rem)]
            break-words whitespace-normal [text-wrap:balance]
            max-w-[90%] md:max-w-4xl lg:max-w-5xl mx-auto
          "
          style={{
            textShadow:
              "0 0 20px rgba(233, 233, 233, 0.8), 0 0 40px rgba(167, 163, 163, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
          }}
        >
          Inspiring Instructor Awards 2025
        </h1>

        {/* Khung giới hạn bề rộng nội dung chữ + nút */}
        <div className="max-w-[90%] md:max-w-3xl lg:max-w-4xl mx-auto w-full min-w-0">
          <TextBox>
            <div className="w-full min-w-0">
              <div
                className="
                  text-center mb-2
                  text-[clamp(1.25rem,3.5vw,2.5rem)]
                "
              >
                ❞
              </div>

              <div
                className="
                  text-white text-center leading-relaxed
                  text-[clamp(0.95rem,1.2vw,1.5rem)]
                  mb-[clamp(1rem,2.5vw,1.5rem)]
                  break-words whitespace-normal
                "
              >
                <p className="break-words whitespace-normal">
                  Danh hiệu{" "}
                  <span className="font-bold">
                    Inspiring Instructor Awards 2025
                  </span>{" "}
                  nhằm tôn vinh những nỗ lực, cống hiến của Giảng viên trong
                  hành trình định hướng, hỗ trợ sinh viên thu nhận kiến thức và
                  truyền cảm hứng đến sinh viên{" "}
                  <span className="font-bold">FPTU HCMC</span> trong 3 học kỳ:{" "}
                  <span className="font-bold">
                    Fall 2024, Spring 2025 và Summer 2025.
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div
                className="
                  flex flex-col sm:flex-row flex-wrap
                  justify-center items-center
                  gap-3 sm:gap-6
                  mt-[clamp(0.75rem,2vw,1.5rem)]
                  min-w-0
                "
              >
                <Link
                  href={"/login"}
                  className="
                    px-4 sm:px-6 md:px-8 py-2 sm:py-3
                    bg-pink-200 text-fuchsia-600 font-bold
                    text-[clamp(1rem,1.5vw,1.25rem)]
                    rounded-full border-2 border-fuchsia-400 shadow-lg
                    hover:bg-pink-300 hover:shadow-xl transition-all duration-300
                    transform hover:scale-105
                  "
                >
                  THAM GIA
                </Link>

                <button
                  onClick={handleShareClick}
                  className="
                    px-4 sm:px-6 md:px-8 py-2 sm:py-3
                    bg-pink-200 text-fuchsia-600 font-bold
                    text-[clamp(1rem,1.5vw,1.25rem)]
                    rounded-full border-2 border-fuchsia-400 shadow-lg
                    hover:bg-pink-300 hover:shadow-xl transition-all duration-300
                    transform hover:scale-105
                  "
                >
                  CHIA SẺ
                </button>
              </div>
            </div>
          </TextBox>
        </div>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <div
          className="
            fixed inset-0 bg-black/60 backdrop-blur
            flex items-center justify-center z-50 px-4
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
        >
          <div
            className="
              bg-white rounded-2xl w-full shadow-2xl
              p-4 sm:p-6 md:p-8
              max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg
              max-h-[90dvh] overflow-y-auto
            "
          >
            <div className="text-center">
              <h3
                id="share-title"
                className="
                  text-gray-800 font-bold mb-6
                  text-[clamp(1.125rem,2.2vw,1.5rem)]
                  break-words whitespace-normal
                "
              >
                Chia sẻ trang web
              </h3>

              {/* QR Code */}
              {qrCodeDataUrl && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    className="
                      border-2 border-gray-200 rounded-lg
                      w-full max-w-48 sm:max-w-56 md:max-w-60
                      h-auto
                    "
                  />
                </div>
              )}

              {/* Link */}
              <div className="mb-6 text-left">
                <p className="text-gray-600 mb-2 text-[clamp(0.8rem,1.2vw,0.95rem)] break-words whitespace-normal">
                  Link chia sẻ:
                </p>
                <div
                  className="
                    bg-gray-100 p-2 sm:p-3 rounded-lg
                    overflow-x-auto
                  "
                >
                  {/* URL dài: break-all để không tràn */}
                  <p
                    className="
                      text-gray-700 select-all
                      text-[clamp(0.8rem,1.2vw,0.95rem)]
                      break-all
                    "
                  >
                    {currentUrl}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button
                  onClick={handleCopyLink}
                  className="
                    px-3 sm:px-4 md:px-6 py-2
                    bg-blue-500 text-white rounded-lg
                    hover:bg-blue-600 transition-colors duration-200
                    text-[clamp(0.9rem,1.2vw,1rem)]
                  "
                >
                  Sao chép link
                </button>
                <button
                  onClick={handleClosePopup}
                  className="
                    px-3 sm:px-4 md:px-6 py-2
                    bg-gray-500 text-white rounded-lg
                    hover:bg-gray-600 transition-colors duration-200
                    text-[clamp(0.9rem,1.2vw,1rem)]
                  "
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroPage;
