import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import { Link, useParams } from 'react-router-dom'
import Wrapbtn from '../../../../components/common/Wrapbtn'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import useQueryadditeam from '../../../../services/Queryadditeam'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SelectoptionHook from '../../../../hooks/SelectoptionHook'
import { UpdateuerVaildions } from '../../../../Validations/AdduserVildions'
import useQueryupdate from '../../../../services/useQueryupdate'
import Loader from '../../../../components/common/Loader'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
const Updateuser = () => {
  const {id} = useParams()
  const {data:getuser , isLoading:getloading} = useQuerygetSpacficIteam("employee" , "employee" , id)
  const CurrentUser = getuser?.data
 const {data} =  useQuerygetiteams("building" , "building")
 const {updateiteam  , isLoading} = useQueryupdate("employee" , "employee")
const usersType = [{name:"مسؤل" , key:"manager"} , {name:"تابع لمنشأه" , key:"user"}]
const [type , setType] = useState("")
 const [value , setvalue] = useState("")
 const [role , setRole] = useState("")
const navigate = useNavigate()
const [building , setBuilding] = useState("")
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
    for (const field of UpdateuerVaildions) {
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
    updateiteam({data , id}, {
      onSuccess: () => {
        toast.success("تم تعديل مستخدم جديد");
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
useEffect(() => {
  if(CurrentUser){
    setType(CurrentUser?.type)
    setvalue(CurrentUser?.permissions?._id)
    setRole(CurrentUser?.role)
    setBuilding(CurrentUser?.building)
  }
} , [CurrentUser])
if(isLoading || getloading) {
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
                       defaultValue={CurrentUser?.username}
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
                        defaultValue={CurrentUser?.email}
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
                        defaultValue={CurrentUser?.identity}
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
                        defaultValue={CurrentUser?.employeeNumber}
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
                          <select  defaultValue={CurrentUser?.grander} name='grander' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
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
                          defaultValue={CurrentUser?.phone}
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
                          defaultValue={CurrentUser?.address?.area}
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
                          defaultValue={CurrentUser?.address?.city}
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
                          defaultValue={CurrentUser?.address?.street}
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
                        htmlFor="building"
                        className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                      >
                   المنشأه التابع لها
                      </label>
                    <select name='building' value={building} onChange={(e) => setBuilding(e.target.value)} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
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
                          <select name='role' value={role} onChange={(e) => setRole(e.target.value)} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
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

export default Updateuser