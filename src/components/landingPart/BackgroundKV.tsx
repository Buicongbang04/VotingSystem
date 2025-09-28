// "use client";
// import { useEffect, useRef, useState } from "react";

// type SectionKey = "hero" | "features" | "stats" | "contact";

// export default function BackgroundKV({ src = "/images/KV.png" }: { src?: string }) {
//     const [active, setActive] = useState<SectionKey>("hero");
//     const ticking = useRef(false);

//     const view: Record<SectionKey, { pos: string; size: string }> = {
//         hero: { pos: "40% 0%", size: "200%" },
//         features: { pos: "0% 80%", size: "150%" },
//         stats: { pos: "90% 80%", size: "205%" },
//         contact: { pos: "50% 85%", size: "100%" },
//     };

//     useEffect(() => {
//         const sections = Array.from(
//             document.querySelectorAll<HTMLElement>("section[data-kv]")
//         );

//         const getKey = (i: number) =>
//             (sections[i]?.getAttribute("data-kv") ?? "hero") as SectionKey;

//         const PRE_TRIGGER = 0.5;

//         const compute = () => {
//             ticking.current = false;

//             const vh = window.innerHeight;
//             const center = window.scrollY + vh * 0.5;

//             let idx = sections.findIndex((el) => {
//                 const r = el.getBoundingClientRect();
//                 const top = r.top + window.scrollY;
//                 const bottom = top + r.height;
//                 return center >= top && center < bottom;
//             });

//             if (idx === -1) {
//                 let nearest = 0;
//                 let minDist = Number.MAX_VALUE;
//                 sections.forEach((el, i) => {
//                     const top = el.getBoundingClientRect().top + window.scrollY;
//                     const dist = Math.abs(center - top);
//                     if (dist < minDist) { minDist = dist; nearest = i; }
//                 });
//                 idx = nearest;
//             }

//             const cur = sections[idx]!;
//             const cr = cur.getBoundingClientRect();
//             const cTop = cr.top + window.scrollY;
//             const progress = Math.min(Math.max((center - cTop) / cr.height, 0), 1);

//             const nextIdx = Math.min(idx + 1, sections.length - 1);
//             const nextKey = getKey(nextIdx);
//             const curKey = getKey(idx);

//             const targetKey: SectionKey =
//                 progress >= PRE_TRIGGER ? nextKey : curKey;

//             setActive((prev) => (prev === targetKey ? prev : targetKey));
//         };

//         const onScroll = () => {
//             if (!ticking.current) {
//                 ticking.current = true;
//                 requestAnimationFrame(compute);
//             }
//         };

//         compute();
//         window.addEventListener("scroll", onScroll, { passive: true });
//         window.addEventListener("resize", onScroll);
//         return () => {
//             window.removeEventListener("scroll", onScroll);
//             window.removeEventListener("resize", onScroll);
//         };
//     }, []);

//     const cfg = view[active];

//     return (
//         <div
//             aria-hidden
//             className="
//         fixed inset-0 -z-10 bg-no-repeat bg-cover
//         transition-[background-size,background-position]
//         duration-[2000ms] ease-[cubic-bezier(.25,.8,.25,1)]
//         motion-reduce:transition-none
//       "
//             style={{
//                 backgroundImage: `url('${src}')`,
//                 backgroundSize: cfg.size,
//                 backgroundPosition: cfg.pos,
//             }}
//         />
//     );
// }
"use client";
import { useEffect, useRef, useState } from "react";

type SectionKey = "hero" | "features" | "stats" | "contact";
type ViewCfg = Record<SectionKey, { pos: string; size: string }>;

export default function BackgroundKV({ src = "/images/KV.png" }: { src?: string }) {
    const [active, setActive] = useState<SectionKey>("hero");
    const ticking = useRef(false);
    const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
    const [landscape, setLandscape] = useState(false);

    // ==== 1) Mapping cho từng breakpoint ====
    const viewDesktop: ViewCfg = {
        hero: { pos: "40% 0%", size: "220%" },
        features: { pos: "0% 78%", size: "170%" },
        stats: { pos: "90% 78%", size: "230%" },
        contact: { pos: "50% 85%", size: "120%" },
    };

    // iPad / tablet (portrait)
    const viewTabletPortrait: ViewCfg = {
        hero: { pos: "45% 100%", size: "260%" },
        features: { pos: "8% 100%", size: "200%" },
        stats: { pos: "88% 100%", size: "260%" },
        contact: { pos: "50% 100%", size: "135%" },
    };

    // iPad / tablet (landscape) – thường cần ít zoom hơn portrait
    const viewTabletLandscape: ViewCfg = {
        hero: { pos: "45% 100%", size: "230%" },
        features: { pos: "6% 100%", size: "185%" },
        stats: { pos: "88% 78%", size: "240%" },
        contact: { pos: "50% 85%", size: "125%" },
    };

    // Mobile (portrait)
    const viewMobile: ViewCfg = {
        hero: { pos: "50% 100%", size: "300%" },
        features: { pos: "12% 100%", size: "230%" },
        stats: { pos: "90% 100%", size: "300%" },
        contact: { pos: "50% 100%", size: "250%" },
    };

    const getView = (): ViewCfg => {
        if (bp === "desktop") return viewDesktop;
        if (bp === "tablet") return landscape ? viewTabletLandscape : viewTabletPortrait;
        return viewMobile;
    };

    // ==== 2) Detect breakpoint + orientation ====
    useEffect(() => {
        const detect = () => {
            const w = window.innerWidth;
            setBp(w < 640 ? "mobile" : w < 1048 ? "tablet" : "desktop");
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

    // ==== 3) Chọn section theo “center-of-viewport” + trigger sớm 50% ====
    useEffect(() => {
        const PRE_TRIGGER = 0.5;

        const compute = () => {
            ticking.current = false;
            const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-kv]"));
            if (!sections.length) return;

            const getKey = (i: number) =>
                (sections[i]?.getAttribute("data-kv") ?? "hero") as SectionKey;

            const vh = window.visualViewport?.height ?? window.innerHeight;
            const center = window.scrollY + vh * 0.5;

            let idx = sections.findIndex((el) => {
                const r = el.getBoundingClientRect();
                const top = r.top + window.scrollY;
                const bottom = top + r.height;
                return center >= top && center < bottom;
            });

            if (idx < 0) {
                let nearest = 0, minDist = Number.MAX_VALUE;
                for (let i = 0; i < sections.length; i++) {
                    const top = sections[i].getBoundingClientRect().top + window.scrollY;
                    const d = Math.abs(center - top);
                    if (d < minDist) { minDist = d; nearest = i; }
                }
                idx = nearest;
            }

            const cur = sections[idx];
            if (!cur) return;

            const cr = cur.getBoundingClientRect();
            const cTop = cr.top + window.scrollY;
            const progress = Math.min(Math.max((center - cTop) / cr.height, 0), 1);

            const nextIdx = Math.min(idx + 1, sections.length - 1);
            const targetKey: SectionKey = progress >= PRE_TRIGGER ? getKey(nextIdx) : getKey(idx);

            setActive((prev) => (prev === targetKey ? prev : targetKey));
        };

        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(compute);
            }
        };

        // run once after mount
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
                // dùng CSS var để clamp theo breakpoint (ở global.css)
                "--kv-size": cfg.size,
                backgroundPosition: cfg.pos,
                backgroundSize: "var(--kv-size)",
            } as React.CSSProperties}
        />
    );
}
