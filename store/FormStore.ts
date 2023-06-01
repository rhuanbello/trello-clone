import { create } from "zustand";

interface FormState {
  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;

  newTaskType: Status;
  setNewTaskType: (newTaskType: Status) => void;
}

export const useFormStore = create<FormState>((set) => ({
  newTaskInput: "",
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: "todo",
  setNewTaskType: (newTaskType) => set({ newTaskType }),
}));
