// src/components/shapes/ShapeRight.tsx
import React from 'react'

interface ShapeProps {
  className?: string
}

export const ShapeRight: React.FC<ShapeProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 386 430"
      preserveAspectRatio="none"
    >
      <path
        fill="url(#b)" // Renomeei o id para 'b' para evitar conflitos de ID no mesmo documento HTML
        d="M366.245 429.19c-44.281 9.903-89.428-74.281-89.428-74.281s-25.491 49.517-53.249 47.448c-26.477-1.973-45.926-50.206-45.926-50.206s-121.708 85.721-164.1 30.847c-60.008-77.677 98.86-156.004 98.86-156.004S8.22 191.021 13.542 145.08c8.398-72.497 164.233-15.011 164.233-15.011s-18.823-93.12 21.33-113.766c46.772-24.052 103.452 86.291 103.452 86.291S465.505-48.914 532.963 16.303c65.258 63.089-81.073 205.664-81.073 205.664s94.854 40.599 81.073 84.121c-14.611 46.143-123.524 7.742-123.524 7.742s3.691 104.874-43.194 115.36Z"
      />
      <defs>
        <linearGradient
          id="b" // Renomeado de 'a' para 'b'
          x1="0"
          x2="504.196"
          y1="57.324"
          y2="342.314"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".236" stopColor="#F74E4E" />
          <stop offset=".524" stopColor="#FB6F92" />
          <stop offset=".822" stopColor="#F77F00" />
        </linearGradient>
      </defs>
    </svg>
  )
}
