import React from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import { Link } from 'react-router-dom'
import Wrapbtn from '../../../../components/common/Wrapbtn'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import useQueryadditeam from '../../../../services/Queryadditeam'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const AddNewuser = () => {
 const {data} =  useQuerygetiteams("building" , "building")
 const {addIteam} = useQueryadditeam("employee" , "employee")
const navigate = useNavigate()
 const handelSubmit = (e) => {
  e.preventDefault();
  try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(formData);
        data.address = {
          area:data.area,
          city:data.city,
          street:data.street
        }
      if(!data.username){
        toast.error("يجب إضافه اسم المستخدم")
          return ;
      }
      if(!data.email){
        toast.error("يجب إضافه  البريد الإلكترونى")
        return ;
    }
      if(!data.identity){
        toast.error("يجب إضافه رقم الهوية ")
        return ;
    }
    if(!data.employeeNumber){
      toast.error("يجب إضافه  الرقم الوظيفى")
      return ;
      
  }
  if(!data.grander){
    toast.error("يجب إضافه   جنس الموظف")
    return ;
    
}
if(!data.phone){
  toast.error("يجب إضافه   رقم الجوال")
  return ;
  
}
if(!data.role){
  toast.error("يجب إضافه  صلاحية المستخدم")
  return ;
  
}
if(!data.area){
  toast.error("يجب إضافه  منطقة المستخدم")
  return ;
  
}
if(!data.city){
  toast.error("يجب إضافه  مدينة المستخدم")
  return ;
  
}if(!data.area){
  toast.error("يجب إضافه  منطقة المستخدم")
  return ;
  
}if(!data.street){
  toast.error("يجب إضافه  عنوان المستخدم")
  return ;
  
}
if(!data.password){
  toast.error("يجب إضافه  كلمة مرور المستخدم")
  return ;
  
}

if(!data.passwordConfirm){
  toast.error("يجب إضافه  تأكيد كلمة مرور المستخدم")
  return ;
  
}
      
      addIteam(data , {
          onSuccess:() =>{
            
              e.target.reset()
              toast.success("تم إضافه مستخدم جديد")
              navigate("/All-users")
          }
      })
  } catch (error) {
      console.log(error);
      toast.error("هناك خطاء فى إضافة مستخدم يرجى التأكد من جميع البيانات ")
  }
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
            
                      <div className="mb-6 flex flex-col  gap-5">
                            <label
                              htmlFor="building"
                              className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                            >
                         المنشأه التابع لها
                            </label>
                          <select name='building' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                                  <option>
                                    أختر
                                    </option>
                                {
                                  data?.data?.data?.map((item) => {
                                    return <option key={item?._id} value={item?._id}>{item.name}</option>
                                  })
                                }
                                  
                                   
                          </select>
                      </div>
                      <div className="mb-6 flex flex-col gap-5">
                        <label
                          htmlFor="permissions"
                          className="w-full text-lg font-medium text-gray-700 dark:text-white"
                        >
                          الصلاحية
                        </label>
                        <select
                          className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                          id="permissions"
                          name='role'
                        >
                           <option value="">أختر صلاحية </option>
                          <option value="owner">مالك المنصة</option>
                          <option value="manager">مدير</option>
                          <option value="facility_manager">مدير المنشأة</option>
                          <option value="safety_manager">مدير السلامة</option>
                          <option value="security_manager">مدير الأمن</option>
                          <option value="contracts_manager">مدير العقود والمشتريات</option>
                          <option value="safety_officer">مسؤول السلامة</option>
                          <option value="security_officer">مسؤول الأمن</option>
                          <option value="supervisor">مشرف القطاع للمراكز الصحية</option>
                          <option value="health_manager">مدير المركز الصحي</option>
                          <option value="security_guard">حارس الأمن</option>
                        </select>
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
        
              {/* wrrap button layout */}
              <Wrapbtn to={"/all-users"} />
        
          {/* wrrap buttons layout */}
        </form>
        {/* END form add new user */}
    </div>
  )
}

export default AddNewuser