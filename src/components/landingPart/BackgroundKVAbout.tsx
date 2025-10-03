"use client";
import { useEffect, useRef, useState } from "react";

type SectionKey = "intro" | "timeline" | "rules" | "honors";
type ViewCfg = Record<SectionKey, { pos: string; size: string }>;

export default function BackgroundKVAbout({ src = "/images/KV.png" }: { src?: string }) {
    const [active, setActive] = useState<SectionKey>("intro");
    const ticking = useRef(false);

    // ---- Responsive states ----
    const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
    const [landscape, setLandscape] = useState(false);

    const viewDesktop: ViewCfg = {
        intro: { pos: "0% 30%", size: "140%" },
        timeline: { pos: "20% 100%", size: "180%" },
        rules: { pos: "-10% 20%", size: "180%" },
        honors: { pos: "100% 60%", size: "180%" },
    };

    // ==== Tablet (portrait) ====
    const viewTabletPortrait: ViewCfg = {
        intro: { pos: "20% -100%", size: "260%" },
        timeline: { pos: "18% 100%", size: "300%" },
        rules: { pos: "20% 0%", size: "300%" },
        honors: { pos: "90% 40%", size: "300%" },
    };

    // ==== Tablet (landscape) ====
    const viewTabletLandscape: ViewCfg = {
        intro: { pos: "50% 10%", size: "230%" },
        timeline: { pos: "16% 72%", size: "195%" },
        rules: { pos: "84% 72%", size: "235%" },
        honors: { pos: "60% 86%", size: "170%" },
    };

    // ==== Mobile (portrait) ====
    const viewMobile: ViewCfg = {
        intro: { pos: "30% 100%", size: "300%" },
        timeline: { pos: "10% 80%", size: "350%" },
        rules: { pos: "30% 0%", size: "380%" },
        honors: { pos: "90% 88%", size: "350%" },
    };

    const getView = (): ViewCfg => {
        if (bp === "desktop") return viewDesktop;
        if (bp === "tablet") return landscape ? viewTabletLandscape : viewTabletPortrait;
        return viewMobile;
    };

    // ---- Detect breakpoint + orientation ----
    useEffect(() => {
        const detect = () => {
            const w = window.innerWidth;
            setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
            setLandscape(window.matchMedia("(orientation: landscape)").matches);
        };
        detect();
        window.addEventListener("resize", detect);
        window.addEventListener("orientationchange", detect as any);
        return () => {
            window.removeEventListener("resize", detect);
            window.removeEventListener("orientationchange", detect as any);
        };
    }, []);

    // ---- Chọn section theo “center-of-viewport” + hysteresis 70%/30% để bớt nhạy ----
    const prevCenterRef = useRef<number | null>(null);

    useEffect(() => {
        const THRESH_FWD = 0.7;  // cuộn xuống: khi section hiện tại chỉ còn 30% -> sang section kế
        const THRESH_BACK = 0.3; // cuộn lên   : khi section hiện tại còn >=70% -> về section trước

        const compute = () => {
            ticking.current = false;

            const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-kv]"));
            if (!sections.length) return;

            const vh = (window as any).visualViewport?.height ?? window.innerHeight;
            const rawCenter = window.scrollY + vh * 0.5;

            // hướng cuộn
            const prevC = prevCenterRef.current ?? rawCenter;
            const scrollingDown = rawCenter > prevC;
            prevCenterRef.current = rawCenter;

            // section chứa center
            let idx = sections.findIndex((el) => {
                const r = el.getBoundingClientRect();
                const top = r.top + window.scrollY;
                const bottom = top + r.height;
                return rawCenter >= top && rawCenter < bottom;
            });
            if (idx < 0) {
                let nearest = 0, min = Number.MAX_VALUE;
                sections.forEach((el, i) => {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    const d = Math.abs(rawCenter - top);
                    if (d < min) { min = d; nearest = i; }
                });
                idx = nearest;
            }

            const cur = sections[idx];
            if (!cur) return;

            const cr = cur.getBoundingClientRect();
            const cTop = cr.top + window.scrollY;
            const progress = Math.min(Math.max((rawCenter - cTop) / cr.height, 0), 1);

            let targetIdx = idx;
            if (scrollingDown && progress >= THRESH_FWD) {
                targetIdx = Math.min(idx + 1, sections.length - 1);
            } else if (!scrollingDown && progress <= THRESH_BACK) {
                targetIdx = Math.max(idx - 1, 0);
            }

            const key = (sections[targetIdx].getAttribute("data-kv") ?? "intro") as SectionKey;
            setActive((prev) => (prev === key ? prev : key));
        };

        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(compute);
            }
        };

        // init
        setTimeout(() => {
            compute();
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onScroll);
        }, 0);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const cfg = getView()[active];

    return (
        <div
            aria-hidden
            className="kv-bg fixed inset-0 -z-10 bg-no-repeat bg-center
                 transition-[background-size,background-position]
                 duration-[2000ms] ease-[cubic-bezier(.25,.8,.25,1)]
                 motion-reduce:transition-none"
            style={{
                backgroundImage: `url('${src}')`,
                // Dùng CSS var để có thể clamp qua @media (tránh hở mép)
                "--kv-size": cfg.size,
                backgroundPosition: cfg.pos,
                backgroundSize: "var(--kv-size)",
            } as React.CSSProperties}
        />
    );
}
