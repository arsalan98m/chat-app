import { useState, useCallback } from "react";

// opening and closing drawer
export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

// Collect id and document from firestore
export const collectIdsAndDocs = (doc) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};
