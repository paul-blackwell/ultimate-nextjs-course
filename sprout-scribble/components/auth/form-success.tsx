import { CheckCircle } from 'lucide-react';

export function FormSussex({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="bg-teal-400 text-secondary-foreground p-3 rounded-md">
      <CheckCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
