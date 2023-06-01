'use client'

import { getUrl } from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  index: number;
  id: Status;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
}

export const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps
}: Props) => {
  const deleteTask = useBoardStore(({ deleteTask }) => deleteTask)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!)

        if (url) {
          setImageUrl(url.toString());
        }
      }

      fetchImage()
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      {imageUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
          <XCircleIcon
            className="ml-5 h-8 w-8"
          />
        </button>
      </div>

    </div>
  )
}