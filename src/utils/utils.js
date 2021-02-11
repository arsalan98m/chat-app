import { useState, useCallback, useEffect } from "react";

// opening and closing drawer
export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

// using media query programmaticaly for responsive dashboard
// const is992px = useMediaQuery('(max-width: 992px)')

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

// Collect id and document from firestore
export const collectIdsAndDocs = (doc) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};

// Updating user updates on firestore
