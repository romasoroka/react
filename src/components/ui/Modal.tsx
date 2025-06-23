import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/70 flex items-center justify-center z-[1000] animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-10 w-[90%] max-w-[650px] max-h-[85vh] overflow-y-auto shadow-2xl relative animate-slideIn md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 p-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-800 hover:text-white dark:hover:text-white transition-colors"
          onClick={onClose}
        >
          {(FaTimes as any)({ size: 20 })}
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2 md:text-xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;