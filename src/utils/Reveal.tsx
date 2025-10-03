"use client";
import React, { useEffect, useRef, useState } from "react";

type Dir = "up" | "down" | "left" | "right";

export default function Reveal({
    children,
    threshold = 0.9,      // thấy ~90% là bắt đầu hiện
    rootMargin = "0px 0px 0px 0px",
    delay = 0,              // ms
    duration = 1000,         // ms
    once = false,            // hiện 1 lần rồi giữ nguyên
    direction = "up",       // hướng xuất hiện
    distance = 32,          // px dịch ban đầu
    blur = 0,               // px mờ ban đầu
}: {
    children: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    direction?: Dir;
    distance?: number;
    blur?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // transform ban đầu theo hướng
    const initialTransform = (() => {
        switch (direction) {
            case "up": return `translateY(${distance}px)`;
            case "down": return `translateY(-${distance}px)`;
            case "left": return `translateX(${distance}px)`;
            case "right": return `translateX(-${distance}px)`;
            default: return `translateY(${distance}px)`;
        }
    })();

    useEffect(() => {
        const el = ref.current!;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setVisible(true);
                        if (once) io.unobserve(el);
                    } else if (!once) {
                        setVisible(false);
                    }
                });
            },
            { threshold, rootMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold, rootMargin, once]);

    return (
        <div
            ref={ref}
            className="will-change-transform"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : initialTransform,
                filter: visible ? "blur(0px)" : `blur(${blur}px)`,
                transition: `opacity ${duration}ms ease, transform ${duration}ms ease, filter ${duration}ms ease`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
