import { Dialog } from "@headlessui/react";

export default function ErrorModal({ isOpen, onClose, message }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <Dialog.Panel className="z-10 bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <Dialog.Title className="text-lg font-bold text-red-600">
          Login Error
        </Dialog.Title>
        <Dialog.Description className="text-gray-700 mt-2">
          {message}
        </Dialog.Description>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
