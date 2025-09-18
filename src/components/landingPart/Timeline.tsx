import Image from "next/image";

export const TimeLineSVG = ({ className }: { className?: string }) => {
  return (
    <div className={`relative w-full overflow-x-clip ${className ?? ""}`}>
      {/* Sân khấu cao hơn để có không gian cho zigzag */}
      <div className="relative w-full min-h-[360px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[600px]">
        {/* ====== ZIGZAG LINE (SVG overlay) ====== */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          {/* Glow */}
          <defs>
            <linearGradient id="zig" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7cf3" />
              <stop offset="60%" stopColor="#9d7cff" />
              <stop offset="100%" stopColor="#75c6ff" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Polyline zigzag: điểm theo phần trăm (x,y) của khung */}
          {/* bắt đầu thấp (gần rocket) -> lên A -> xuống nhẹ ở B -> lên C -> lên cao ở D */}
          <polyline
            points="
              6,90
              25,15
              40,58
              60,70
              75,40
            "
            fill="none"
            stroke="url(#zig)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            opacity="0.95"
          />
          Dấu chấm mốc
          {[
            [6, 90],
            [25, 15],
            [40, 58],
            [60, 70],
            [75, 40],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.6"
              fill="white"
              stroke="url(#zig)"
              strokeWidth="1"
            />
          ))}
          {[
            // anchor(x,y), box(x,y,width,height), align ("left" => mũi line chạm cạnh trái, "right" => cạnh phải)
            {
              a: [6, 90],
              b: { x: 12, y: 78, w: 20, h: 12 },
              align: "left",
              title: "Chuẩn bị",
              desc: "--/--/2025",
            },
            {
              a: [25, 15],
              b: { x: 28, y: 0, w: 20, h: 12 },
              align: "left",
              title: "Bình chọn",
              desc: "10/10/2025",
            },
            {
              a: [40, 58],
              b: { x: 43, y: 45, w: 20, h: 12 },
              align: "left",
              title: "Kết thúc",
              desc: "31/10/2025",
            },
            {
              a: [60, 70],
              b: { x: 62, y: 75, w: 24, h: 12 },
              align: "left",
              title: "TOP 10",
              desc: "01/11/2025",
            },
            {
              a: [75, 40],
              b: { x: 80, y: 45, w: 20, h: 12 },
              align: "left",
              title: "Vinh danh",
              desc: "31/11/2025",
            },
          ].map(({ a, b, align, title, desc }, i) => {
            const [ax, ay] = a;
            // Điểm tiếp xúc trên cạnh hộp (trái/phải) — vẽ đường thẳng 1px
            const bx = align === "left" ? b.x : b.x + b.w;
            const by = b.y + b.h / 2;

            return (
              <g key={`callout-${i}`}>
                {/* LINE: solid 1px từ dot đến box */}
                <line
                  x1={ax}
                  y1={ay}
                  x2={bx}
                  y2={by}
                  stroke="#ffffff"
                  strokeOpacity="0.9"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />

                {/* BOX: nền tối trong suốt + viền gradient */}
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="2.5"
                  fill="#a5a5a5ff"
                  fillOpacity="0.55"
                  stroke="url(#zig)"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* TEXT: tiêu đề + mô tả (tỷ lệ theo viewBox) */}
                <text
                  x={b.x + 2}
                  y={b.y + 4.6}
                  fontSize="3"
                  fontWeight="700"
                  fill="#ffffff"
                >
                  {title}
                </text>
                <text x={b.x + 2} y={b.y + 8.9} fontSize="2.6" fill="#d7d9ff">
                  {desc}
                </text>
              </g>
            );
          })}
        </svg>
        {/* Rocket */}
        <div className="absolute bottom-[12%] left-[1%] w-[14vw] md:w-[10vw] lg:w-[8vw] [width:clamp(56px,14vw,100px)]">
          <Image
            src="/images/tenlua.png"
            alt="Tên lửa"
            width={180}
            height={180}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Planet A */}
        <div className="absolute bottom-[20%] left-[18%] w-[20vw] md:w-[15vw] lg:w-[12vw] [width:clamp(70px,20vw,160px)]">
          <Image
            src="/images/planet.png"
            alt="Hành tinh A"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Planet B */}
        <div className="absolute bottom-[60%] left-[45%] w-[16vw] md:w-[12vw] lg:w-[9vw] [width:clamp(60px,16vw,130px)]">
          <Image
            src="/images/planet1.png"
            alt="Hành tinh B"
            width={220}
            height={220}
            className="w-full h-auto"
          />
        </div>

        {/* Planet C */}
        <div className="absolute bottom-[5%] left-[80%] w-[18vw] md:w-[13vw] lg:w-[10vw] [width:clamp(64px,18vw,140px)]">
          <Image
            src="/images/planet2.png"
            alt="Hành tinh C"
            width={240}
            height={240}
            className="w-full h-auto"
          />
        </div>

        {/* Planet D (cao nhất) */}
        <div className="absolute top-[1%] right-[5%] w-[22vw] md:w-[16vw] lg:w-[12vw] [width:clamp(80px,22vw,180px)]">
          <Image
            src="/images/planet4.png"
            alt="Hành tinh D"
            width={320}
            height={320}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};
