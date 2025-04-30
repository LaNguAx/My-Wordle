import { memo, useCallback, useEffect } from 'react';
import { KEYBOARD_ROWS } from '../assets/consts';

export default memo(function Keyboard({
  status,
  dispatch,
}: {
  status: any;
  dispatch: any;
}) {
  // Single handler for both physical keys and button clicks
  const handleInput = useCallback(
    (rawKey: string) => {
      if (status !== 'playing') return;

      const key = rawKey.toLowerCase();
      switch (key) {
        case 'backspace':
          dispatch({ type: 'DELETE_LETTER' });
          break;
        case 'enter':
          dispatch({ type: 'SUBMIT_GUESS' });
          break;
        default:
          if (/^[a-z]$/.test(key)) {
            dispatch({ type: 'ADD_LETTER', payload: key.toUpperCase() });
          }
      }
    },
    [status, dispatch]
  );

  // Listen for physical key presses once
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => handleInput(e.key);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleInput]);

  // If the game is over, show the status message instead of buttons
  if (status !== 'playing') {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-semibold">You {status.toUpperCase()}!</h1>
      </div>
    );
  }

  // Render the on-screen keyboard
  return (
    <div className="space-y-2">
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1">
          {row.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => handleInput(label)}
              className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] 
                         text-white text-sm font-bold py-2 px-3 rounded 
                         active:scale-95 transition-transform"
            >
              {label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
});
