export const formatTodosForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;

    return map;
  }, {} as { [key in Status]: Todo[] });

  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as Status] = value.length;
      return map;
    },
    {} as { [key in Status]: number }
  );

  return flatArrayCounted;
};
