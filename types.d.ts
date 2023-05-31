interface Board {
  columns: Map<Status, Column>;
}

interface Column {
  id: Status;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: Status;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}

type Status = "todo" | "inprogress" | "done";
