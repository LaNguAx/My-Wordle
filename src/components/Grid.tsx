import useGameContext from '../hooks/useGameContext';
import { memo } from 'react';

export default memo(function Grid() {
  const {
    state: { guesses, attempt, currentGuess, word },
  } = useGameContext();

  function getLetter(row: number, col: number) {
    if (row < attempt) return guesses[row]?.guess[col] ?? '';
    if (row === attempt) return currentGuess[col] ?? '';

    return '';
  }

  function getCellClass(letter: string, row: number, col: number) {
    if (row < attempt && letter === word[col]) {
      return 'bg-green-200';
    }
    if (row < attempt && word.includes(letter)) return 'bg-yellow-200';
    return 'bg-white';
  }

  return (
    <div className="grid grid-rows-6 gap-2 mb-8">
      {Array.from({ length: 6 }).map((_, row) => (
        <div key={row} className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, col) => {
            const letter = getLetter(row, col);
            const cellClass = getCellClass(letter, row, col);

            return (
              <div
                key={col}
                className={`w-12 h-12 border border-gray-300 text-2xl font-semibold flex items-center justify-center uppercase ${cellClass}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
