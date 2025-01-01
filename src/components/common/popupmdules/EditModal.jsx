import React from "react";

const EditModal = ({ isVisible, onClose, onSubmit, entity, placeholder }) => {
  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded-md shadow-lg w-full max-w-md"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="mb-5">
          <label htmlFor="name" className="block text-lg font-medium mt-3">
            تعديل {entity}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={placeholder}
            className="mt-2 w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-main py-2 text-white rounded hover:bg-main2"
        >
          حفظ
        </button>
      </form>
    </div>
  );
};

export default EditModal;
