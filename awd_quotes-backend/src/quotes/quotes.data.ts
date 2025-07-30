import { Quote } from 'src/types/app.type';

export const quotes: Quote[] = [
  {
    id: '1',
    quote:
      'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi',
    authorSlug: 'mahatma-gandhi',
  },
  {
    id: '2',
    quote: 'Be the change that you wish to see in the world.',
    author: 'Mahatma Gandhi',
    authorSlug: 'mahatma-gandhi',
  },
  {
    id: '3',
    quote:
      "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: 'Maya Angelou',
    authorSlug: 'maya-angelou',
  },
  {
    id: '4',
    quote:
      'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    author: 'Ralph Waldo Emerson',
    authorSlug: 'ralph-waldo-emerson',
  },
  {
    id: '5',
    quote: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
    authorSlug: 'albert-einstein',
  },
  {
    id: '6',
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon',
    authorSlug: 'john-lennon',
  },
  {
    id: '7',
    quote: "If you tell the truth, you don't have to remember anything.",
    author: 'Mark Twain',
    authorSlug: 'mark-twain',
  },
  {
    id: '8',
    quote: 'The mind is everything. What you think you become.',
    author: 'Buddha',
    authorSlug: 'buddha',
  },
  {
    id: '9',
    quote: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    authorSlug: 'oscar-wilde',
  },
  {
    id: '10',
    quote: 'You only live once, but if you do it right, once is enough.',
    author: 'Mae West',
    authorSlug: 'mae-west',
  },
];

export function getQuotes(): Quote[] {
  return [...quotes];
}
