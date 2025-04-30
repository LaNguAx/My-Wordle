import { ReloadIcon } from '@radix-ui/react-icons';

export default function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]">
      <ReloadIcon className="h-24 w-24 text-blue-600 animate-spin" />
    </div>
  );
}
