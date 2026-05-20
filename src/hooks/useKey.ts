import { useEffect } from "react";

export function useKey(key: string, callback: () => void): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback, key]);
}
