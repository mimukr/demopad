import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  const currentHash = window.location.hash;
  const [pageKey] = useState(currentHash);
  const storageKey = "demopad-" + pageKey;

  useEffect(() => {
    if (currentHash !== pageKey) {
      window.location.reload();
    }
  }, [currentHash]);

  useEffect(() => textAreaElement.current?.focus(), []);

  const handleTab = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      // Use execCommand instead of setting value directly to keep undo working
      document.execCommand("insertText", false, "    ");
    }
  }, []);

  return (
    <textarea
      ref={textAreaElement}
      defaultValue={localStorage.getItem(storageKey) || ""}
      onChange={(e) => (e.target.value ? localStorage.setItem(storageKey, e.target.value) : localStorage.removeItem(storageKey))}
      onKeyDown={handleTab}
      className="pad"
    />
  );
}

export default App;
