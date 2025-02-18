import React, { useState } from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import { Link } from 'react-router-dom'
import Wrapbtn from '../../../../components/common/Wrapbtn'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import useQueryadditeam from '../../../../services/Queryadditeam'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SelectoptionHook from '../../../../hooks/SelectoptionHook'
import { AdduserVildions } from '../../../../Validations/AdduserVildions'
import Loader from '../../../../components/common/Loader'
const AddNewuser = () => {
 const {data} =  useQuerygetiteams("building" , "building")
 const {addIteam , isLoading} = useQueryadditeam("employee" , "employee")
const usersType = [{name:"مسؤل" , key:"admin"} , {name:"تابع لمنشأه" , key:"user"}]
const [type , setType] = useState("admin")
 const [value , setvalue] = useState("")
const navigate = useNavigate()
const handelSubmit = (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    data.permissions = value; // Ensure permissions are set
    data.address = {
      area: data.area,
      city: data.city,
      street: data.street,
    };
    data.type = type
    // Validate Required Fields First
    for (const field of AdduserVildions) {
      if (!data[field.key]) {
        toast.error(field.message);
        return; // Stop execution
      }
    }

    // User Type Validation
    console.log(data);
    
    const validateUser = () => {
      if (type === "admin") {
        if (!data.role) return "يجب اختيار نوع المستخدم";
        if (data.role === "employee" && !data.permissions) return "يجب اختيار صلاحية المستخدم";
      } else if (type === "employee") {
        if (!data.permissions || data.permissions === "") return "يجب اختيار صلاحية المستخدم";
      } else if (type === "user") {
        if (!data.building) return "يجب اختيار المنشأة التابع لها المستخدم";
        if (!data.permissions || data.permissions === "") return "يجب اختيار صلاحية المستخدم";
      }
      return null;
    };

    const validationError = validateUser();
    if (validationError) {
      toast.error(validationError);
      return; // Stop execution
    }
    // If everything is valid, submit the data
    addIteam(data, {
      onSuccess: () => {
        toast.success("تم إضافة مستخدم جديد");
        e.target.reset();
        navigate("/All-users");
      },
      onError:(error) => {
      return toast.error(error?.response?.data?.errors[0]?.msg || "هناك خطأ ما")
        
      }
    });
  } catch (error) {
    console.error(error);
    toast.error("هناك خطأ في إضافة مستخدم يرجى التأكد من جميع البيانات");
  }
};
if(isLoading){
  return <Loader />
}
  return (
    <div className='w-full'>
        <Breadcrumb  pageName="إضافه مستخدم"/>
        {/* form add new user */}
        <form onSubmit={handelSubmit} className='w-full h-full shadow-md p-5	'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 w-full items-center'>
                  <div className="mb-6 flex flex-col  gap-2">
                      <label
                        htmlFor="username"
                        className="w-full text-lg font-medium text-gray-700 dark:text-white"
                      >
                        إسم الموظف
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                       
                        className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-6 flex flex-col  gap-2">
                      <label
                        htmlFor="email"
                        className="w-full text-lg font-medium text-gray-700 dark:text-white"
                      >
                       البريد الإلكترونى
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                       
                        className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-6 flex flex-col  gap-2">
                      <label
                        htmlFor="identity"
                        className="w-full text-lg font-medium text-gray-700 dark:text-white"
                      >
                        رقم الهويه / الإقامة 
                      </label>
                      <input
                        type="text"
                        id="identity"
                        name="identity"
                    
                        className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-6 flex flex-col  gap-2">
                      <label
                        htmlFor="employeeNumber"
                        className="w-full text-lg font-medium text-gray-700 dark:text-white"
                      >
                        الرقم الوظيفى
                      </label>
                      <input
                        type="text"
                        id="employeeNumber"
                        name="employeeNumber"
                    
                        className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-6 flex flex-col  gap-5">
                            <label
                              htmlFor="grander"
                              className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                            >
                         الجنس
                            </label>
                          <select name='grander' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                                  <option>
                                    أختر
                                    </option>
                                    <option value="male">
                                    ذكر
                                    </option>
                                    <option value="female">
                                    انثى
                                    </option>
                                  
                                   
                          </select>
                      </div>
                      <div className="mb-6  flex flex-col  gap-2">
                        <label
                          htmlFor="phone"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                        رقم الجوال
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                       
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-6  flex flex-col  gap-2">
                        <label
                          htmlFor="area"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                       المنطقة
                        </label>
                        <input
                          type="text"
                          id="area"
                          name="area"
                         
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-6  flex flex-col  gap-2">
                        <label
                          htmlFor="city"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                       المدينة
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                         
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-6  flex flex-col  gap-2">
                        <label
                          htmlFor="street"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                       العنوان
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                        
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                        />
                      </div>
            
    
                  

                      <div className="mb-6  flex flex-col  gap-2">
                        <label
                          htmlFor="password"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                       كلمة المرور
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                        defaultValue="weqa1234"
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-6  flex flex-col  gap-2">
                        <label
                          htmlFor="passwordConfirm"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                      تأكيد كلمة المرور 
                        </label>
                        <input
                          type="password"
                          id="passwordConfirm"
                          name="passwordConfirm"
                           defaultValue="weqa1234"
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                        />
                      </div>
                  
                 
          </div>
                 <div >
                     <span  className="w-full text-lg font-medium text-gray-700 dark:text-white mb-5">نوع المستخدم</span>
                    <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full mt-2 mb-4'>
                            {
                                usersType.map((item) => {
                                  return    <button
                                  key={item.key}
                                  onClick={() => setType(item.key)}
                                  className={`block text-white  ${type === item.key ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
                                  type="button"
                                >
                                    {item.name}
                                </button>
                                })
                          }
                    </div>
                    {
                      type ==="user" ? 
                      <>
                           <div className="mb-6 flex flex-col  gap-5">
                          
                          <label
                            htmlFor="grander"
                            className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                          >
                       نوع المستخدم
                          </label>
                        <select name='role' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                                <option value="">
                                  أختر
                                  </option>
                                  <option value="manager">
                                  مدير المنشأه
                                  </option>
                                  <option value="user">
                                  مستخدم
                                  </option>
                                
                                 
                        </select>


                    </div>
                      <div className="mb-6 flex flex-col  gap-5">
                      <label
                        htmlFor="building"
                        className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                      >
                   المنشأه التابع لها
                      </label>
                    <select name='building' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                            <option value="">
                              أختر
                              </option>
                            
                          {
                            data?.data?.data?.map((item) => {
                              return <option key={item?._id} value={item?._id}>{item.name}</option>
                            })
                          }
                            
                             
                    </select>
                </div>
                <SelectoptionHook title="أختر الصلاحية" value={value} setvalue={setvalue} fectParentKEY="permission" keyName="permissions" /> </>: 
                 <div className="mb-6 flex flex-col  gap-5">
                          
                            <label
                              htmlFor="grander"
                              className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                            >
                         نوع المستخدم
                            </label>
                          <select name='role' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                                  <option value="">
                                    أختر
                                    </option>
                                    <option value="owner">
                                    مالك المنصة
                                    </option>
                                    <option value="employee">
                                    موظف
                                    </option>
                                  
                                   
                          </select>

                          <SelectoptionHook title="أختر الصلاحية" value={value} setvalue={setvalue} fectParentKEY="permission" keyName="permissions" /> 

                      </div>
                    }
               
                 </div>
        
              {/* wrrap button layout */}
              <Wrapbtn to={"/all-users"} />
        
          {/* wrrap buttons layout */}
        </form>
        {/* END form add new user */}
    </div>
  )
}

export default AddNewuser