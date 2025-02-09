

import { redirect} from "react-router-dom"


 const Checkuserautherzationview = (store , permissionsModule , key ) => () => {
  const user = store.getState().userState.userinfo;
  const iteams = JSON.parse(localStorage.getItem("user")) 
  if(!iteams) {
    return redirect('/auth/signin')
  }
  const permissions = user.permissions || {};
  const modulePermissions = permissions[permissionsModule] || { actions: [] }
const included = modulePermissions?.actions?.some((per) => per === key)
    if( !(user.role === "owner" || included)) {
       
      return  redirect("/")
    }


    return null
}
 export default Checkuserautherzationview