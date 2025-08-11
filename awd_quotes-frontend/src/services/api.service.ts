import slugify from 'slugify'

export interface Quote {
  id: string
  quote: string
  author: string
  authorSlug: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

const API_BASE_URL = 'http://localhost:3000'

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
  let allQuotes: Quote[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const response = await fetch(
      `${API_BASE_URL}/quotes?page=${page}&limit=100`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch all quotes.')
    }

    const result = await response.json()
    allQuotes = [...allQuotes, ...result.data]

    // Verifica se há mais páginas
    hasMore =
      result.data.length === result.limit && allQuotes.length < result.total
    page++
  }

  return allQuotes
}

export async function fetchQuotesPage(
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<Quote>> {
  const response = await fetch(
    `${API_BASE_URL}/quotes?page=${page}&limit=${limit}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch quotes page.')
  }
  return response.json()
}

export async function fetchAllAuthors(): Promise<string[]> {
  // Busca uma página grande para pegar todos os autores únicos
  // Se houver muitos autores, você pode implementar um endpoint específico no backend
  const response = await fetch(`${API_BASE_URL}/quotes?page=1&limit=1000`)
  if (!response.ok) {
    throw new Error('Failed to fetch authors.')
  }

  const result: PaginatedResponse<Quote> = await response.json()
  const authors = [...new Set(result.data.map((quote: Quote) => quote.author))]
  return authors
}
