// src/components/shapes/ShapeLeft.tsx
import React from 'react'

interface ShapeProps {
  className?: string
}

export const ShapeLeft: React.FC<ShapeProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 486 726"
    >
      <path
        stroke="url(#a)"
        stroke-width="154.197"
        d="m-55.652 196.384 93.347 4.582-99.925 88.757 219.773-77.546-220.658 149.325 208.931-104.179-232.149 187.025 483.62-246.325-491.461 353.186 379.207-191.525-198.56 145.705L-126.5 663.5"
      />
      <defs>
        <linearGradient
          id="a"
          x1="-28.601"
          x2="297.938"
          y1="442.986"
          y2="266.698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F77F00" stop-opacity=".39" />
          <stop offset=".48" stop-color="#F166A7" />
          <stop offset="1" stop-color="#F74E4E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
