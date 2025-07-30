// src/App.tsx
import { useState, useEffect } from 'react'
import type { Quote } from './services/api.service'
import {
  fetchAllQuotes,
  fetchRandomQuote,
  fetchQuotesByAuthor,
} from './services/api.service'

import { BackgroundShapes } from './components/BackgroundShapes'
import { Logo } from './components/Logo'
import { QuoteDisplay } from './components/QuoteDisplay'
import { BottomSegmentedNav } from './components/BottomSegmentedNav'
import { SearchInput } from './components/SearchInput'
import { AllQuotesGrid } from './components/AllQuotesGrid'
import { AuthorQuotesView } from './components/AuthorQuotesView'

function App() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [allAuthors, setAllAuthors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedSegment, setSelectedSegment] = useState<'inspire' | 'all'>(
    'inspire',
  )
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [authorQuotes, setAuthorQuotes] = useState<Quote[] | null>(null)
  const [authorLoading, setAuthorLoading] = useState(false)

  // Fetch all initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      try {
        const allQuotes = await fetchAllQuotes()
        setAllQuotes(allQuotes)
        // Extrai autores únicos
        const authors = [...new Set(allQuotes.map((q) => q.author))]
        setAllAuthors(authors)

        // Defines the initial quote
        const initialQuote = allQuotes.find(
          (q) => q.author === 'Ralph Waldo Emerson',
        )
        setQuote(initialQuote || allQuotes[0]) // Fallback for first quote
        setSelectedSegment('inspire')
      } catch (error) {
        console.error('Failed to load initial data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadInitialData()
  }, [])

  const getQuote = async (fetchFn: () => Promise<Quote | Quote[]>) => {
    setIsLoading(true)
    try {
      const result = await fetchFn()
      setQuote(Array.isArray(result) ? result[0] : result)
    } catch (error) {
      console.error('Failed to fetch quote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInspireMe = () => {
    setSelectedAuthor(null)
    setAuthorQuotes(null)
    getQuote(fetchRandomQuote)
  }

  const handleAuthorSelect = async (author: string) => {
    setSelectedAuthor(author)
    setAuthorLoading(true)
    try {
      // Agora o backend faz o slugify, só enviar o nome do autor
      const quotes = await fetchQuotesByAuthor(author)
      setAuthorQuotes(quotes)
    } catch (error) {
      console.error('Failed to fetch quotes by author:', error)
      setAuthorQuotes([])
    } finally {
      setAuthorLoading(false)
    }
  }

  return (
    <div className="relative w-screen min-h-screen flex flex-col p-8 md:p-12 overflow-hidden font-['Switzer']">
      <BackgroundShapes />

      {/* Header with absolute positioning for total control */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6">
        <Logo className="w-64 h-auto logo-svg" />

        <SearchInput
          allAuthors={allAuthors}
          onAuthorSelect={handleAuthorSelect}
        />
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full flex-grow flex flex-col justify-center items-center gap-12">
        {/* Different layout for the quote display and segmented navigation */}
        <div
          className={`min-h-[300px] flex w-full ${
            selectedSegment === 'inspire'
              ? 'justify-center items-center'
              : 'items-start'
          }`}
        >
          {selectedAuthor && authorLoading && (
            <p className="text-xl text-gray-700">Loading quotes...</p>
          )}
          {selectedAuthor && authorQuotes && authorQuotes.length > 0 && (
            <AuthorQuotesView
              author={selectedAuthor}
              authorSlug={authorQuotes[0].authorSlug}
              quotes={authorQuotes}
              onBack={() => {
                setSelectedAuthor(null)
                setAuthorQuotes(null)
              }}
            />
          )}
          {!selectedAuthor && selectedSegment === 'all' ? (
            <AllQuotesGrid quotes={allQuotes} />
          ) : !selectedAuthor && isLoading && !quote ? (
            <p className="text-xl text-gray-700">Finding some wisdom...</p>
          ) : (
            !selectedAuthor && quote && <QuoteDisplay quote={quote} />
          )}
        </div>
        <BottomSegmentedNav
          selected={selectedSegment}
          onSelect={(value) => {
            setSelectedSegment(value)
            setSelectedAuthor(null)
            setAuthorQuotes(null)
            if (value === 'inspire') {
              handleInspireMe()
            } else {
              setQuote(null)
            }
          }}
        />
      </main>

      <footer className="w-full h-10 flex-shrink-0"></footer>
    </div>
  )
}

export default App
