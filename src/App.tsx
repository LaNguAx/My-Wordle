import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './assets/styles.css';
import AppLayout from './components/AppLayout';
import { GameContextProvider as GameContext } from './hooks/useGameContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GameContext>
          <AppLayout />
        </GameContext>
      </QueryClientProvider>
    </>
  );
}
