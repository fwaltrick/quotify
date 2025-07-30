import slugify from 'slugify'

export interface Quote {
  id: string
  quote: string
  author: string
  authorSlug: string // O campo para a imagem
}

const API_BASE_URL = 'http://localhost:3000' // A URL do seu backend NestJS

export async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch(`${API_BASE_URL}/quotes/random`)
  if (!response.ok) {
    throw new Error('Failed to fetch a random quote.')
  }
  return response.json()
}

export async function fetchQuotesByAuthor(author: string): Promise<Quote[]> {
  const authorSlug = slugify(author, { lower: true, strict: true })
  const response = await fetch(`${API_BASE_URL}/quotes/${authorSlug}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch quotes for author: ${authorSlug}`)
  }
  return response.json()
}

export async function fetchAllQuotes(): Promise<Quote[]> {
  const response = await fetch(`${API_BASE_URL}/quotes`)
  if (!response.ok) {
    throw new Error('Failed to fetch all quotes.')
  }
  return response.json()
}
