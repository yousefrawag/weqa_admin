import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import authFetch from '../../utils/axiosAuthfetch';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import logo from "../../images/logo/weqa.png"
import { useState } from "react";

const UserChangePassword = () => {
    const user = useSelector((state) => state.userState.userinfo);
    const navigate = useNavigate();
const [loading , setLoading] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            formData.set("id", user._id);
            const data = Object.fromEntries(formData);
            if(!data.password){
                return toast.error("يجب كتابه كلمة المرور الخاصة بك")
            }
            setLoading(true)
            const resp = await authFetch.put(`/employee/changeEmployeePassword`, data);
                console.log(resp);
                
            if (resp.status === 200) {
                toast.success("تم تغيير كلمه المرور بنجاح");
                return navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.data || "حدث خطأ ما!");
            setLoading(false)
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-transparent p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="logo" className="w-24" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
                    إعادة تعيين كلمة المرور <FaLock />
                </h2>
                <form className="space-y-4 mt-4" onSubmit={onSubmit}>
                 

                    {/* الحقل الثاني */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-3">
                            كلمة المرور الجديدة
                        </label>
                        <div className="flex items-center border rounded-md p-2 bg-gray-50">
                            <input
                                type="password"
                                required
                                name="password"
                                className="w-full bg-transparent outline-none"
                            />
                            <FaLock className="text-gray-500" />
                        </div>
                    </div>

                    {/* زر التأكيد */}
                    <button
                        type="submit"
                        className="w-full bg-main text-white py-2 rounded-md  transition"
                    >
                        تأكيد
                    </button>
                    {
                        loading && <span> جارى تغير كلمة المرور...</span>
                    }
                </form>
            </div>
        </div>
    );
};

export default UserChangePassword;
