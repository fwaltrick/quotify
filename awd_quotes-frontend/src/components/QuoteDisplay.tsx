// src/components/QuoteDisplay.tsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Quote } from '../services/api.service'

interface QuoteDisplayProps {
  quote: Quote
}

// ANIMAÇÃO CORRIGIDA: Apenas opacidade e posição Y, sem escala.
const animationVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0, transition: { duration: 0.4 } }, // Desce e desaparece
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  const imageUrl = `/images/${quote.authorSlug}.png`

  return (
    <div className="w-full max-w-3xl xl:max-w-4xl 2xl:max-w-5xl flex justify-center items-center gap-8 xl:gap-10 2xl:gap-12 z-10">
      <div className="relative w-36 h-40 xl:w-40 xl:h-48 2xl:w-48 2xl:h-56 flex-shrink-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44 bg-[#fb6f92] rounded-full" />
        <AnimatePresence mode="wait">
          <motion.div
            key={quote.id + '-image'}
            className="absolute bottom-0 left-0 w-full h-full"
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-36 xl:h-40 2xl:h-48 w-auto object-contain"
              alt={quote.author}
              src={imageUrl}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative text-left text-[#1e1e1e]">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.id + '-text'}
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-2xl md:text-3xl xl:text-4xl 2xl:text-4xl font-medium leading-tight max-w-lg xl:max-w-xl 2xl:max-w-xl z-0">
                {quote.quote}
              </p>
              <div className="mt-2 text-[#f74e4ecc] text-lg md:text-xl xl:text-xl 2xl:text-xl font-bold">
                {quote.author}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
