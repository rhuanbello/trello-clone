import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { database, storage } from "@/appwrite";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateBoard: (todo: Todo, columnId: Status) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  deleteTask: (taskIndex: number, todoId: Todo, id: Status) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  board: {
    columns: new Map<Status, Column>(),
  },

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  updateBoard: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);

    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({
      board: {
        columns: newColumns,
      },
    });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },
}));
