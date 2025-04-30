import { memo } from 'react';

export default memo(function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('header render');
  return (
    <h1 className="text-4xl font-bold mb-6 text-[var(--color-primary)]">
      Wordle Clone
      <p className="text-center">{children}</p>
    </h1>
  );
});
