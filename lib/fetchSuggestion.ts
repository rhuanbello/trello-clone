import { formatTodosForAI } from "./formatTodosForAI";

export const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);

  const response = await fetch(`/api/generateSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  if (!response.ok) return;

  const data = await response.json();
  const { content } = data;

  return content;
};
