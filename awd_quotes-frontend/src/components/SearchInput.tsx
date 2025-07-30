import React, { useState, useRef, useEffect } from 'react'

interface SearchInputProps {
  allAuthors: string[]
  onAuthorSelect: (author: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  allAuthors,
  onAuthorSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1)
  const listRef = useRef<HTMLUListElement>(null)

  const filteredAuthors = searchTerm
    ? allAuthors.filter((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const handleSelect = (author: string) => {
    onAuthorSelect(author)
    setSearchTerm('')
    setHighlightedIdx(-1)
  }

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredAuthors.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIdx((idx) => (idx + 1) % filteredAuthors.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIdx((idx) => (idx - 1 + filteredAuthors.length) % filteredAuthors.length)
    } else if (e.key === 'Enter' && highlightedIdx >= 0) {
      e.preventDefault()
      handleSelect(filteredAuthors[highlightedIdx])
    }
  }

  // Reset highlight ao abrir/fechar
  useEffect(() => {
    if (!isFocused) setHighlightedIdx(-1)
  }, [isFocused, searchTerm])

  return (
    // O contêiner relativo para o input e a lista de resultados
    <div className="relative w-full max-w-md z-50">
      {/* 
        O contêiner do input com o ícone dentro.
        Usamos `position: relative` aqui para o ícone.
      */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-neutral-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Find a thinker..."
          className="w-full py-2 pl-10 pr-4  text-neutral-800 bg-neutral-50 bg-opacity-40 rounded-full border border-transparent focus:bg-opacity-80 focus:border-neutral-400 focus:outline-none transition-all duration-300"
          onKeyDown={handleKeyDown}
          aria-activedescendant={highlightedIdx >= 0 ? `author-option-${highlightedIdx}` : undefined}
          aria-autocomplete="list"
          aria-controls="author-listbox"
        />
      </div>

      {isFocused && filteredAuthors.length > 0 && (
        <ul
          ref={listRef}
          id="author-listbox"
          className="absolute top-full mt-2 w-full bg-neutral-50 text-neutral-800 rounded-lg shadow-lg z-50"
          role="listbox"
        >
          {filteredAuthors.map((author, idx) => (
            <li
              key={author}
              id={`author-option-${idx}`}
              role="option"
              aria-selected={highlightedIdx === idx}
              onMouseDown={() => handleSelect(author)}
              onMouseEnter={() => setHighlightedIdx(idx)}
              className={`p-3 cursor-pointer transition-colors
                ${highlightedIdx === idx ? 'bg-[#f74e4e] text-white' : 'hover:bg-neutral-200'}
                ${idx === 0 ? 'rounded-t-lg' : ''}
                ${idx === filteredAuthors.length - 1 ? 'rounded-b-lg' : ''}
              `}
            >
              {author}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
