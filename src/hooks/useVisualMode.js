import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // ["FIRST", "SECOND", "THIRD"] ==> ["FIRST", "THIRD"]
  const transition = function(newMode, replace = false) {
    if (replace) {
      const newHistory = history.filter(h => h !== mode);
      setHistory([...newHistory, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  };

  const back = function() {
    // so that mode cannot go past initial state
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      const newHistory = history.filter(mode => mode !== history[history.length - 1]);
      setHistory(newHistory);
    }
  }
  return {mode, transition, back};
};