import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
const [module, setmodule] = useState(false);
const [editmainCategory , setEditmaincategory] = useState(false)
const [moduleAddAsset ,setModuleAddAsset ] = useState(false)
const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user from localStorage:", storedUser); // Debugging
    return storedUser ? JSON.parse(storedUser) : false;
  });

  // Update local storage whenever user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
const [mainCategory , setmainCategory] = useState({
    _id:"",
    name:""
})
const handelEditmainCategory = (item) => {
setEditmaincategory(true)
setmainCategory(item)
}
    return (
        <DashboardContext.Provider
            value={{
                module,
                setmodule,
                editmainCategory , 
                setEditmaincategory,
                handelEditmainCategory,
                mainCategory,
                setmainCategory,
                moduleAddAsset ,
                setModuleAddAsset,
                user , setUser
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;

export const useDashboardContext = () => useContext(DashboardContext);
