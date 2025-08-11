import React from 'react'
import { motion } from 'framer-motion'
import type { Quote } from '../services/api.service'

interface AuthorQuotesViewProps {
  author: string
  authorSlug: string
  quotes: Quote[]
  onBack?: () => void
}

export const AuthorQuotesView: React.FC<AuthorQuotesViewProps> = ({
  author,
  authorSlug,
  quotes,
}) => {
  if (!quotes.length) return null
  const imageUrl = `/images/${authorSlug}.png`

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 px-2 -mt-16">
      {/* Topo: Foto, círculo rosa e nome do autor em destaque */}
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="relative w-36 h-36 mb-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#fb6f92] rounded-full" />
          <img
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-auto object-contain"
            alt={author}
            src={imageUrl}
          />
        </div>
        <div className="text-center">
          <div className="text-3xl font-extrabold text-[#f74e4e] mb-1">
            {author}
          </div>
        </div>
      </div>
      {/* Grid de cards: todas as citações, cada uma com o nome do autor */}
      <div
        className={`w-full gap-6 mt-4 grid ${
          quotes.length === 1
            ? 'grid-cols-1 justify-items-center'
            : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {quotes.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col gap-4 min-h-[120px] max-w-[500px]"
          >
            <p className="text-base text-[#1e1e1e] font-medium leading-snug">
              {q.quote}
            </p>
            <span className="text-[#f74e4e] font-bold text-sm -mt-2">
              {q.author}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
