import React from 'react'
import { motion } from 'framer-motion'

interface BottomSegmentedNavProps {
  selected: 'inspire' | 'all'
  onSelect: (value: 'inspire' | 'all') => void
}

export const BottomSegmentedNav: React.FC<BottomSegmentedNavProps> = ({
  selected,
  onSelect,
}) => (
  <nav className="fixed bottom-16 left-0 w-full flex justify-center z-50 pb-4">
    <div className="relative flex rounded-full shadow-lg border border-gray-200 overflow-hidden bg-white/30 backdrop-blur w-[400px]">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute inset-0 flex"
      >
        {selected === 'inspire' && (
          <motion.div
            layoutId="segment-bg"
            className="w-1/2 h-full bg-[#F74E4E] rounded-full z-0"
            style={{ left: 0, position: 'absolute' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        {selected === 'all' && (
          <motion.div
            layoutId="segment-bg"
            className="w-1/2 h-full bg-[#F74E4E] rounded-full z-0"
            style={{ right: 0, left: '50%', position: 'absolute' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
      <button
        className={`relative w-1/2 px-6 py-3 text-base font-semibold flex items-center justify-center gap-2 focus:outline-none transition-colors duration-200 z-10 cursor-pointer
          ${
            selected === 'inspire'
              ? 'text-white bg-transparent'
              : 'text-[#1e1e1e]'
          }
        `}
        style={{
          WebkitTapHighlightColor: 'transparent',
          borderRadius: '9999px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          if (selected !== 'inspire')
            e.currentTarget.style.background = '#f74e4e22'
        }}
        onMouseLeave={(e) => {
          if (selected !== 'inspire')
            e.currentTarget.style.background = 'transparent'
        }}
        onClick={() => onSelect('inspire')}
        aria-pressed={selected === 'inspire'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
        Inspire Me
      </button>
      <button
        className={`relative w-1/2 px-6 py-3 text-base font-semibold flex items-center justify-center gap-2 focus:outline-none transition-colors duration-200 z-10 cursor-pointer
          ${selected === 'all' ? 'text-white bg-transparent' : 'text-[#1e1e1e]'}
        `}
        style={{
          WebkitTapHighlightColor: 'transparent',
          borderRadius: '9999px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          if (selected !== 'all') e.currentTarget.style.background = '#f74e4e22'
        }}
        onMouseLeave={(e) => {
          if (selected !== 'all')
            e.currentTarget.style.background = 'transparent'
        }}
        onClick={() => onSelect('all')}
        aria-pressed={selected === 'all'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        See All Quotes
      </button>
    </div>
  </nav>
)
