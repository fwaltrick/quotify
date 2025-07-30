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
    // O contêiner principal usa Flexbox para alinhar a imagem e o texto.
    <div className="w-full max-w-4xl flex justify-center items-center gap-8 z-10">
      {/* Este contêiner relativo segura a imagem e seu fundo de círculo. */}
      <div className="relative w-40 h-48 flex-shrink-0">
        {/* Camada Estática (O Círculo) - NUNCA SE MOVE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-[#fb6f92] rounded-full" />

        {/* Camada Animada (A Imagem do Autor) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quote.id + '-image'} // Chave única para a imagem
            className="absolute bottom-0 left-0 w-full h-full"
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} // Curva de easing mais suave
          >
            <img
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-44 w-auto object-contain"
              alt={quote.author}
              src={imageUrl}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative text-left text-[#1e1e1e]">
        {/* Camada Estática (As Aspas) - NUNCA SE MOVE */}
        {/* <svg
          className="absolute w-16 h-auto -top-12 -left-8 pointer-events-none select-none"
          viewBox="0 0 70 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#1E1E1E"
            fillOpacity=".8"
            d="M69.038 42.03c-1.17-8.014-6.502-12.572-14.328-12.468-2.833-3.494-6.509-11.755 1.457-27.476-15.399 10.917-30.417 57.715 0 55.806 7.405-.465 14.04-7.846 12.871-15.861ZM30.074 46.132c.03-8.1-4.57-13.402-12.325-14.463C15.463 27.792 13.672 14.361 23.875 0 7.03 8.505-15.363 57.264 15 59.903c7.392.642 15.045-5.67 15.073-13.77Z"
          />
        </svg> */}
        {/* Camada Animada (O Texto) */}
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
              <p className="text-2xl md:text-3xl font-medium leading-tight max-w-lg z-0">
                {quote.quote}
              </p>
              <div className="mt-2 text-[#f74e4ecc] text-lg md:text-xl font-bold">
                {quote.author}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
