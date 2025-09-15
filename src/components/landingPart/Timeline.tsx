export const TimeLineSVG = ({ className }: { className?: string }) => {
  return (
    <svg width='900' height='400' xmlns='http://www.w3.org/2000/svg'>
      <polyline
        points='100,300 250,220 550,180 700,100'
        fill='none'
        stroke='#ff69b4'
        stroke-width='3'
        stroke-dasharray='6,6'
        className={className}
      />

      <polygon points='80,300 60,310 60,290' fill='#ff4da6' />
      <circle cx='65' cy='300' r='10' fill='#ff4da6' />

      <line
        x1='100'
        y1='300'
        x2='100'
        y2='340'
        stroke='#ff69b4'
        stroke-width='2'
      />
      <line
        x1='250'
        y1='220'
        x2='250'
        y2='190'
        stroke='#ff69b4'
        stroke-width='2'
      />
      <line
        x1='550'
        y1='180'
        x2='550'
        y2='220'
        stroke='#ff69b4'
        stroke-width='2'
      />
      <line
        x1='700'
        y1='100'
        x2='730'
        y2='70'
        stroke='#ff69b4'
        stroke-width='2'
      />

      <text x='80' y='360' font-family='Arial' font-size='14' fill='white'>
        10/10/2025
      </text>
      <text x='80' y='380' font-family='Arial' font-size='12' fill='white'>
        Bình chọn
      </text>

      <text x='210' y='180' font-family='Arial' font-size='14' fill='white'>
        31/10/2025
      </text>
      <text x='190' y='165' font-family='Arial' font-size='12' fill='white'>
        Kết thúc bình chọn
      </text>

      <text x='520' y='240' font-family='Arial' font-size='14' fill='white'>
        01/11/2025
      </text>
      <text x='510' y='260' font-family='Arial' font-size='12' fill='white'>
        Công bố Top 10
      </text>

      <text x='740' y='60' font-family='Arial' font-size='14' fill='white'>
        31/10/2025
      </text>
      <text x='730' y='80' font-family='Arial' font-size='12' fill='white'>
        Vinh danh Top 10
      </text>
    </svg>
  )
}
