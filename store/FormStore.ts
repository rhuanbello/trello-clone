import { create } from "zustand";

interface FormState {
  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;

  newTaskType: Status;
  setNewTaskType: (newTaskType: Status) => void;

  image: File | null;
  setImage: (image: File | null) => void;
}

export const useFormStore = create<FormState>((set) => ({
  newTaskInput: "",
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: "todo",
  setNewTaskType: (newTaskType) => set({ newTaskType }),

  image: null,
  setImage: (image) => set({ image }),
}));
