import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-4 justify-center mt-2 mb-16 w-full text-lg select-none">
      <span
        className={
          currentPage === 1 ? 'text-gray-400' : 'cursor-pointer hover:underline'
        }
        onClick={
          currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)
        }
        style={{ userSelect: 'none' }}
        aria-label="Previous page"
      >
        &#171;
      </span>
      <span className="mx-2">
        <span className="font-bold">{currentPage}</span>
        {totalPages > 1 && <span> of {totalPages}</span>}
      </span>
      <span
        className={
          currentPage === totalPages
            ? 'text-gray-400'
            : 'cursor-pointer hover:underline'
        }
        onClick={
          currentPage === totalPages
            ? undefined
            : () => onPageChange(currentPage + 1)
        }
        style={{ userSelect: 'none' }}
        aria-label="Next page"
      >
        &#187;
      </span>
    </div>
  )
}
