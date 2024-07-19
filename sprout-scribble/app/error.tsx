'use client';
import { useEffect } from "react";

export default function Error({
  error,
  reset,
} : {
  error: Error & { digest?: string }
  rest: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  )
}
