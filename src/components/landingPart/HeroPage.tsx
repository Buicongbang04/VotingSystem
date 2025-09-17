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
    // Get current URL
    const url = window.location.href;
    setCurrentUrl(url);

    // Generate QR code
    QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    }).then(setQrCodeDataUrl);
  }, []);

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      // You could add a toast notification here
      alert("Link đã được sao chép!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center snap-section bg-hero"
    >
      <div className="mx-auto">
        <div
          className="text-white text-8xl font-bold mb-6 text-center"
          style={{
            textShadow:
              "0 0 20px rgba(233, 233, 233, 0.8), 0 0 40px rgba(167, 163, 163, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
          }}
        >
          Inspiring Instructor Awards 2025
        </div>

        <TextBox>
          <div className="text-center text-7xl">❞</div>
          <div className="text-white text-3xl mb-6 text-center max-w-7xl mx-auto">
            Danh hiệu{" "}
            <span className="font-bold"> Inspiring Instructor Awards 2025</span>{" "}
            nhằm tôn vinh những nỗ lực, cống hiến của Giảng viên trong hành
            trình định hướng, hỗ trợ sinh viên thu nhận kiến thức và truyền cảm
            hứng đến sinh viên <span className="font-bold">FPTU HCMC</span>{" "}
            trong 3 học kỳ:{" "}
            <span className="font-bold">
              Fall 2024, Spring 2025 và Summer 2025.{" "}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Link
              href={"/login"}
              className="px-8 py-3 bg-pink-200 text-fuchsia-600 font-bold text-xl rounded-full border-2 border-fuchsia-400 shadow-lg hover:bg-pink-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              THAM GIA
            </Link>
            <button
              onClick={handleShareClick}
              className="px-8 py-3 bg-pink-200 text-fuchsia-600 font-bold text-xl rounded-full border-2 border-fuchsia-400 shadow-lg hover:bg-pink-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              CHIA SẺ
            </button>
          </div>
        </TextBox>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Chia sẻ trang web
              </h3>

              {/* QR Code */}
              <div className="mb-6">
                {qrCodeDataUrl && (
                  <div className="flex justify-center">
                    <img
                      src={qrCodeDataUrl}
                      alt="QR Code"
                      className="border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Link */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Link chia sẻ:</p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-xs text-gray-700 break-all">
                    {currentUrl}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Sao chép link
                </button>
                <button
                  onClick={handleClosePopup}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
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
