type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
  role: string;
  className?: string;
};

export default function Button({
  onClick: handler,
  children,
  role,
  type,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={handler}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
      type={type}
      role={role}
    >
      {children}
    </button>
  );
}
