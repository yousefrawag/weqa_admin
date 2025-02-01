import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../context/DashboardProviedr';
import UploadImage from './UploadImage';
import SelectCategory from '../components/ui/assets/Addasset/SelectCategory';
import useQueryadditeam from '../services/Queryadditeam';
import toast from 'react-hot-toast';
import SmailLoader from '../components/common/Loader/SmailLoader';
import { inputFields } from '../data/index'; // Import the inputFields array
import SelectSection from '../components/ui/assets/Addasset/SelectSection';
import useQueryupdate from '../services/useQueryupdate';
import SelectoptionHook from './SelectoptionHook';
const EditCagorayassetHook = ({id , endpoint, keyName,item , fectParentKEY, ismainLevel , mdoule , setModule }) => {
  const { isError, isLoading, updateiteam } = useQueryupdate(endpoint, keyName);
  const [level , setlevel] = useState("")

  const [images, setImages] = useState({
    file: "",
    view: ""
  });
  const [selectedInputs, setSelectedInputs] = useState([]);

  const handelFiles = (e) => {
    const file = e.target.files[0];
    if (file) {
      const convertFiles = URL.createObjectURL(file);
      setImages({
        file: file,
        view: convertFiles,
      });
    }
  };

  const handleInputSelection = (e, input) => {
    if (e.target.checked) {
      // Add the input to selectedInputs with an empty selectedOptions array
      setSelectedInputs([...selectedInputs, { ...input, selectedOptions: [] }]);
    } else {
      // Remove the input from selectedInputs
      setSelectedInputs(selectedInputs.filter(item => item.id !== input.id));
    }
  };

  const handleOptionSelection = (inputId, optionValue) => {
    // Update the selectedOptions for the specific input
    setSelectedInputs(selectedInputs.map(item => {
      if (item.id === inputId) {
        const currentOptions = item.selectedOptions || [];
        if (currentOptions.includes(optionValue)) {
          // Remove the option if it's already selected
          return {
            ...item,
            selectedOptions: currentOptions.filter(value => value !== optionValue),
          };
        } else {
          // Add the option if it's not selected
          return {
            ...item,
            selectedOptions: [...currentOptions, optionValue],
          };
        }
      }
      return item;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
  
    if (images.view) {
      formData.set("image", images.file);
    } else {
      return toast.error("يجب إضافة صوره للفئة");
    }
  
    if (!data.name) {
      return toast.error("يجب إضافة إسم الفئة");
    }
  
    if (selectedInputs.length === 0) {
      return toast.error("يجب إضافه مدخلات الفئة");
    }
  
    // Create a new FormData object to include only selected fields
    const filteredFormData = new FormData();
  
    // Add the name and image fields
    filteredFormData.set("name", data.name);
    if (images.file) {
      filteredFormData.set("image", images.file);
    }
  
  
    formData.append("data", JSON.stringify(selectedInputs));

    // Log the filtered form data to verify its contents
    console.log("Filtered Form Data:", data);
  
    try {
        updateiteam({data:formData , id}, {
        onSuccess: () => {
          setImages({
            file: "",
            view: ""
          });
          setModule(false);
          setSelectedInputs([])
          toast.success('تم إضافه فئه بنجاح');
       
        },
      });
    } catch (error) {
      toast.error('هناك خطأ في فئة الموقع');
    }
  }
  useEffect(() => {
    if(item) {
        setSelectedInputs([...item?.data] ||[] )
        setImages((prev) => ({...images , view:item.image}))
        console.log(item);
        
    }
  } , [item])

  return (
    <div className={`px-7 lg:px-0 fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center top-0 right-0 bottom-0 ${mdoule ? "flex" : "hidden"}`}>
      <div className="relative bg-white p-4 lg:p-6 rounded-md shadow-lg w-full lg:max-w-[60%] h-[90%] mx-auto flex flex-col">
        <button
          onClick={() => setModule(false)}
          className="absolute top-3 right-5 lg:right-10 text-gray-500 hover:text-gray-800 focus:outline-none"
          type='button'
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto mb-4 px-5">
          {isLoading ? <SmailLoader /> :
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 w-full'>
              {ismainLevel ? null : <SelectoptionHook  title="الفئه التابع لها" fectParentKEY={fectParentKEY} keyName={keyName} />}
              <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="name" className="w-full text-lg font-medium text-gray-700 dark:text-black">
                  إسم الفئه
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={item?.name}
                  className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="w-full text-lg font-medium text-gray-700 dark:text-black">
                  اختر حقول الإدخال
                </label>
                <div className="h-48 overflow-y-auto border border-gray-300 p-2 rounded-md">
                  {inputFields.map((input) => (
                    <div key={input.id} className="flex flex-col mb-2">
                      <div className="flex gap-4 items-center">
                        <input
                          type="checkbox"
                          id={input.id}
                          name={input.key}
                          onChange={(e) => handleInputSelection(e, input)}
                          className="form-checkbox h-5 w-5 text-main rounded"
                        />
                        <label htmlFor={input.id} className="ml-2 text-gray-700">
                          {input.name}
                        </label>
                      </div>
                      {input.type === 'select' && selectedInputs.some(item => item.id === input.id) && (
                        <div className="ml-6 mt-2 border-2 border-main p-3">
                          {input.options.map((option) => (
                            <div key={option.value} className="flex gap-3 items-center">
                              <input
                                type="checkbox"
                                id={`${input.key}-${option.value}`}
                                name={`${input.key}-${option.value}`}
                                checked={selectedInputs.find(item => item.id === input.id)?.selectedOptions?.includes(option.value) || false}
                                onChange={() => handleOptionSelection(input.id, option.value)}
                                className="form-checkbox h-4 w-4 text-main rounded"
                              />
                              <label htmlFor={`${input.key}-${option.value}`} className="ml-2 text-gray-700">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <UploadImage images={images} handelFiles={handelFiles} />
              <button
                type="submit"
                className="mt-4 font-bold block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
              >
                حفظ
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default EditCagorayassetHook;