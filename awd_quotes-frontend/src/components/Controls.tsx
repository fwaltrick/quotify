// src/components/Controls.tsx
import React from 'react'

interface ControlsProps {
  onEnlightMeClick: () => void
  isLoading: boolean
}

export const Controls: React.FC<ControlsProps> = ({
  onEnlightMeClick,
  isLoading,
}) => {
  return (
    // O contêiner principal agora usa Flexbox para alinhar os itens.
    <div className="flex items-center justify-between w-full gap-8">
      {/* 
        ITEM 1 (Esquerda): Placeholder vazio.
        - 'w-1/3': Ocupa um terço do espaço para criar um layout de três colunas.
      */}
      <div className="w-1/3"></div>

      {/* 
        ITEM 2 (Centro): O Botão Principal.
        - 'w-1/3': Também ocupa um terço do espaço, ajudando na centralização.
      */}
      <div className="w-1/3">
        <button
          onClick={onEnlightMeClick}
          disabled={isLoading}
          // Ligeiramente menor com px-12 (antes era px-16)
          className="px-12 py-4 bg-[#e85d04] rounded-2xl text-white text-2xl font-bold transition-transform duration-200 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-wait"
        >
          {isLoading ? 'Enlightening...' : 'Enlight Me'}
        </button>
      </div>

      {/* 
        ITEM 3 (Direita): O Link de Busca.
        - 'w-1/3': Ocupa o terço final do espaço.
        - 'justify-end': Alinha o conteúdo (o link) à direita dentro de sua coluna.
      */}
      <div className="w-1/3 flex justify-end">
        <a
          href="#"
          className="flex items-center gap-3 text-[#f74e4ecc] text-xl"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <span>Find a thinker</span>
        </a>
      </div>
    </div>
  )
}
