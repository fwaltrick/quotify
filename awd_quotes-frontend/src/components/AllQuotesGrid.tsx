import React from 'react'
import type { Quote } from '../services/api.service'

interface AllQuotesGridProps {
  quotes: Quote[]
}

export const AllQuotesGrid: React.FC<AllQuotesGridProps> = ({ quotes }) => (
  <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 px-2">
    {quotes.map((quote) => (
      <div
        key={quote.id}
        className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col gap-4 min-h-[140px]"
      >
        <p className="text-base text-[#1e1e1e] font-medium leading-snug">
          {quote.quote}
        </p>
        <span className="text-[#f74e4e] font-bold text-sm">{quote.author}</span>
      </div>
    ))}
  </div>
)
