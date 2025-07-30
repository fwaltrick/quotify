// src/components/EnlightMeButton.tsx
import React from 'react'

interface CTAButtonProps {
  onClick: () => void
  isLoading: boolean
}

export const CTAButton: React.FC<CTAButtonProps> = ({ onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    // Ligeiramente menor com padding py-3 e px-12
    className="px-12 py-3 bg-[#F74E4E] rounded-2xl text-white text-xl font-semibold transition-transform duration-200 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-wait"
  >
    {isLoading ? 'Enlightening...' : 'Enlighten Me'}
  </button>
)
