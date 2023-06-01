'use client'

import { useBoardStore } from "@/store/BoardStore"
import { useFormStore } from "@/store/FormStore"
import { useModalStore } from "@/store/ModalStore"
import { Dialog, Transition } from "@headlessui/react"
import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { FormEvent, Fragment, useRef, useState } from "react"
import { TaskTypeRadioGroup } from "./TaskTypeRadioGroup"

export const Modal = () => {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const addTask = useBoardStore(({ addTask }) => addTask);

  const [closeModal, isOpen] = useModalStore(({ closeModal, isOpen }) => [
    closeModal,
    isOpen
  ]);

  const [newTaskInput, setNewTaskInput, newTaskType, image, setImage] = useFormStore(
    ({ newTaskInput, setNewTaskInput, image, setImage, newTaskType }) => [
      newTaskInput,
      setNewTaskInput,
      newTaskType,
      image,
      setImage
    ]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image)
    setNewTaskInput('');
    setImage(null);
    closeModal();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onSubmit={handleSubmit} onClose={closeModal} as='form' className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a new task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 outline-none"
                    placeholder="Task name"
                  />
                </div>

                <TaskTypeRadioGroup />

                <div>
                  <button
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={(e) => {
                      e.preventDefault()
                      imagePickerRef.current?.click()
                    }}
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>

                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      onClick={() => {
                        setImage(null)
                      }}
                    />
                  )}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith('image/')) return;
                      setImage(e.target.files![0])
                    }}
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 hover:from-blue-200 hover:to-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-gradient-to-b transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 