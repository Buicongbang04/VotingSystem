"use client"
import { useEffect, useRef, useState } from "react"

type SectionKey = "hero" | "features" | "stats" | "contact"
type ViewCfg = Record<SectionKey, { pos: string; size: string }>

export default function BackgroundKV({
  src = "/images/KV.png",
}: {
  src?: string
}) {
  const [active, setActive] = useState<SectionKey>("hero")
  const ticking = useRef(false)
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [landscape, setLandscape] = useState(false)

  // ==== mapping của bạn ====
  const viewDesktop: ViewCfg = {
    hero: { pos: "40% 0%", size: "220%" },
    features: { pos: "0% 78%", size: "170%" },
    stats: { pos: "100% 78%", size: "230%" },
    contact: { pos: "50% 85%", size: "120%" },
  }
  const viewTabletPortrait: ViewCfg = {
    hero: { pos: "20% -180%", size: "260%" },
    features: { pos: "0% 100%", size: "280%" },
    stats: { pos: "100% 100%", size: "260%" },
    contact: { pos: "50% 100%", size: "200%" },
  }
  const viewTabletLandscape: ViewCfg = {
    hero: { pos: "60% 100%", size: "300%" },
    features: { pos: "6% 100%", size: "185%" },
    stats: { pos: "88% 78%", size: "240%" },
    contact: { pos: "50% 85%", size: "125%" },
  }
  const viewMobile: ViewCfg = {
    hero: { pos: "50% 100%", size: "350%" },
    features: { pos: "5% 100%", size: "320%" },
    stats: { pos: "1% 100%", size: "350%" },
    contact: { pos: "50% 100%", size: "320%" },
  }
  const getView = (): ViewCfg =>
    bp === "desktop"
      ? viewDesktop
      : bp === "tablet"
      ? landscape
        ? viewTabletLandscape
        : viewTabletPortrait
      : viewMobile

  // detect breakpoint + orientation
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth
      setBp(w < 768 ? "mobile" : w < 992 && w >= 768 ? "tablet" : "desktop")
      setLandscape(window.matchMedia("(orientation: landscape)").matches)
    }
    detect()
    window.addEventListener("resize", detect)
    window.addEventListener("orientationchange", detect as any)
    return () => {
      window.removeEventListener("resize", detect)
      window.removeEventListener("orientationchange", detect as any)
    }
  }, [])

  // ====== GIẢM ĐỘ NHẠY: 70% tiến trình mới nhảy tới phần sau; 30% mới trả về phần trước
  const prevCenterRef = useRef<number | null>(null)

  useEffect(() => {
    const THRESH_FWD = 0.9 // cuộn xuống: còn ~30% mới nhảy tiếp
    const THRESH_BACK = 0.1 // cuộn lên  : còn >70% mới trả về trước

    const compute = () => {
      ticking.current = false

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-kv]")
      )
      if (!sections.length) return

      const vh = (window as any).visualViewport?.height ?? window.innerHeight
      const rawCenter = window.scrollY + vh * 0.5

      // xác định hướng cuộn bằng center trước đó
      const prevC = prevCenterRef.current ?? rawCenter
      const scrollingDown = rawCenter > prevC
      prevCenterRef.current = rawCenter

      // tìm section chứa center
      let idx = sections.findIndex((el) => {
        const r = el.getBoundingClientRect()
        const top = r.top + window.scrollY
        const bottom = top + r.height
        return rawCenter >= top && rawCenter < bottom
      })
      if (idx < 0) {
        let nearest = 0,
          min = Number.MAX_VALUE
        sections.forEach((el, i) => {
          const top = el.getBoundingClientRect().top + window.scrollY
          const d = Math.abs(rawCenter - top)
          if (d < min) {
            min = d
            nearest = i
          }
        })
        idx = nearest
      }

      const cur = sections[idx]
      if (!cur) return

      const cr = cur.getBoundingClientRect()
      const cTop = cr.top + window.scrollY
      const progress = Math.min(Math.max((rawCenter - cTop) / cr.height, 0), 1)

      let targetIdx = idx
      if (scrollingDown && progress >= THRESH_FWD) {
        targetIdx = Math.min(idx + 1, sections.length - 1)
      } else if (!scrollingDown && progress <= THRESH_BACK) {
        targetIdx = Math.max(idx - 1, 0)
      }

      const key = (sections[targetIdx].getAttribute("data-kv") ??
        "hero") as SectionKey
      setActive((prev) => (prev === key ? prev : key))
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(compute)
      }
    }

    // init
    setTimeout(() => {
      compute()
      window.addEventListener("scroll", onScroll, { passive: true })
      window.addEventListener("resize", onScroll)
    }, 0)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const cfg = getView()[active]

  return (
    <div
      aria-hidden
      className='kv-bg fixed inset-0 -z-10 bg-no-repeat bg-center
                 transition-[background-size,background-position]
                 duration-[2000ms] ease-[cubic-bezier(.25,.8,.25,1)]
                 motion-reduce:transition-none'
      style={
        {
          backgroundImage: `url('${src}')`,
          "--kv-size": cfg.size,
          backgroundPosition: cfg.pos,
          backgroundSize: "var(--kv-size)",
        } as React.CSSProperties
      }
    />
  )
}
