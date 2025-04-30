import { useQuery } from '@tanstack/react-query';

async function getRandomWord(): Promise<string> {
  const res = await fetch(
    'https://random-word-api.herokuapp.com/word?length=5'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch random word.');
  }

  const [data] = await res.json();

  if (typeof data !== 'string') {
    throw new Error('Invalid response format from random word API.');
  }

  return data;
}

export function useRandomWord() {
  const {
    isPending: isLoading,
    data: word,
    refetch,
  } = useQuery<string, Error>({
    queryKey: ['randomWord'],
    queryFn: getRandomWord,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
  });

  return { isLoading, word, refetch };
}
