import { memo, useEffect } from 'react';
import { KEYBOARD_ROWS } from '../assets/consts';

function Keyboard({ status, dispatch }: { status: any; dispatch: any }) {
  console.log('render from keyboard');

  useEffect(() => {
    function handleKeyClick(e: KeyboardEvent) {
      if (status === 'playing') {
        if (e.key.toLowerCase() === 'backspace')
          dispatch({ type: 'DELETE_LETTER' });
        else if (e.key.toLowerCase() === 'enter')
          dispatch({ type: 'SUBMIT_GUESS' });
        else if (/^[a-zA-Z]$/.test(e.key)) {
          dispatch({ type: 'ADD_LETTER', payload: e.key.toUpperCase() });
        }
      }
    }
    document.addEventListener('keydown', handleKeyClick);

    return () => document.removeEventListener('keydown', handleKeyClick);
  }, [status]);

  const playing = status === 'playing';
  if (!playing) return <h1>You {status.toUpperCase()}!</h1>;

  return (
    <div className="space-y-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white text-sm font-bold py-2 px-3 rounded active:scale-95 transition-all"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default memo(Keyboard);
