import { createContext, useContext, ReactNode, useReducer } from 'react';

type Guess = {
  attempt: number;
  guess: string;
};
export type GameState = {
  word: string;
  currentGuess: string;
  guesses: Guess[];
  attempt: number;
  status: 'playing' | 'won' | 'lost';
};

export type GameAction =
  | { type: 'SET_WORD'; payload: string }
  | { type: 'ADD_LETTER'; payload: string }
  | { type: 'DELETE_LETTER' }
  | { type: 'SUBMIT_GUESS' }
  | { type: 'RESET' };

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};

const initialState: GameState = {
  word: '',
  currentGuess: '',
  guesses: [],
  attempt: 0,
  status: 'playing',
};

const GameContext = createContext<GameContextType | null>(null);

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_WORD':
      return { ...state, word: action.payload };
    case 'ADD_LETTER': {
      if (state.currentGuess.length === 5) return state;

      return {
        ...state,
        currentGuess: state.currentGuess + action.payload,
      };
    }
    case 'DELETE_LETTER': {
      if (state.currentGuess.length === 0) return state;
      return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
    }
    case 'SUBMIT_GUESS': {
      if (state.currentGuess.length !== 5 || state.status === 'lost')
        return state;
      // if user is correct
      if (state.currentGuess === state.word)
        return {
          ...state,
          guesses: [
            ...state.guesses,
            { attempt: state.attempt, guess: state.currentGuess },
          ],
          attempt: state.attempt + 1,
          currentGuess: '',
          status: 'won',
        };

      // if user is incorrect
      if (state.currentGuess !== state.word) {
        // last attempt
        if (state.attempt === 6 - 1) return { ...state, status: 'lost' };

        // not last attemp
        return {
          ...state,
          guesses: [
            ...state.guesses,
            { attempt: state.attempt, guess: state.currentGuess },
          ],
          attempt: state.attempt + 1,
          currentGuess: '',
        };
      }
      return state;
    }
    case 'RESET':
      return { ...initialState, word: state.word };
    default:
      return state;
  }
}

export default function useGameContext() {
  const context = useContext(GameContext);
  if (!context)
    throw new Error('useGameContext must be used within GameContext.Provider');
  return context;
}
