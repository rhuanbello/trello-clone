'use client'

import { useFormStore } from "@/store/FormStore"
import { useModalStore } from "@/store/ModalStore"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { TaskTypeRadioGroup } from "./TaskTypeRadioGroup"

export const Modal = () => {
  const [closeModal, isOpen] = useModalStore(({ closeModal, isOpen }) => [closeModal, isOpen])
  const [newTaskInput, setNewTaskInput] = useFormStore(({ newTaskInput, setNewTaskInput }) => [newTaskInput, setNewTaskInput])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal} as='form' className="relative z-10">
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 