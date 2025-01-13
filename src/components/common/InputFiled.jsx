import React from 'react'

const InputFiled = ({label ,type , name , defaultvalue , title}) => {
  return (
    <div className="mb-6 flex flex-col  gap-2">
    <label
      htmlFor={name}
      className="w-full text-lg font-medium text-gray-700 dark:text-white"
    >
    {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={title}
      defaultValue={defaultvalue}
      className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
    />
 
  </div>
  )
}

export default InputFiled