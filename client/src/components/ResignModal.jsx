
import { Dialog, Transition } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';


export default function ResignModal({ isOpen, onClose, onConfirm }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="fixed inset-0 z-10 flex items-center justify-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <div className="bg-gray-800 p-6 rounded shadow-lg z-20">
          <Dialog.Title className="text-lg font-semibold text-white">
            Confirm Resign
          </Dialog.Title>
          <p className="mt-2 text-gray-200">
            Are you sure you want to resign this match?
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded text-white"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Resign
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

