import { useState } from "react";
import "./App.css";

function App() {
  const key = "demopad";
  const [text, setText] = useState(() => localStorage.getItem(key) || "");
  return (
    <textarea
      value={text}
      onChange={(e) => {
        localStorage.setItem(key, e.target.value);
        setText(e.target.value);
      }}
      className="pad"
    />
  );
}

export default App;
