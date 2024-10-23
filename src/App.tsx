import { useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  const storageKey = "demopad";

  useEffect(() => textAreaElement.current?.focus(), []);
  const handleTab = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      e.currentTarget.value = e.currentTarget.value.substring(0, start) + "    " + e.currentTarget.value.substring(end);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
    }
  }, []);

  return (
    <textarea
      ref={textAreaElement}
      defaultValue={localStorage.getItem(storageKey) || ""}
      onChange={(e) => localStorage.setItem(storageKey, e.target.value)}
      onKeyDown={handleTab}
      className="pad"
    />
  );
}

export default App;
