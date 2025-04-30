import { useEffect, useState } from 'react';
import Grid from './Grid';
import Header from './Header';
import Keyboard from './Keyboard';
import { useRandomWord } from '../hooks/useRandomWord';
import Spinner from './Spinner';
import useGameContext from '../hooks/useGameContext';
import Button from './Button';
import { memo } from 'react';

function AppLayout() {
  const [hideWord, setHideWord] = useState(false);

  const {
    state: { word, status },
    dispatch,
  } = useGameContext();

  const { isLoading, word: fetchedWord } = useRandomWord();

  useEffect(() => {
    if (fetchedWord)
      dispatch({ type: 'SET_WORD', payload: fetchedWord.toUpperCase() });
  }, [fetchedWord]);

  if (isLoading || !word) return <Spinner />;

  const playing = status === 'playing';

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-[var(--font-sans)] flex flex-col items-center justify-center p-4">
      <Header>
        <Button
          type="button"
          role="button"
          onClick={(e) => {
            e.currentTarget.blur();
            setHideWord((prev) => !prev);
          }}
          className="text-sm cursor-pointer"
        >
          Show Word
        </Button>
      </Header>
      {(hideWord || !playing) && word}
      <Grid />
      <Keyboard dispatch={dispatch} status={status} />

      {!playing && (
        <Button
          role="reset"
          type="button"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Reset
        </Button>
      )}
    </div>
  );
}

export default memo(AppLayout);
