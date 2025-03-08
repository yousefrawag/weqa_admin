import React from 'react'
import SelectoptionHook from '../../../hooks/SelectoptionHook'
const RenderLevelsFlow = ({Currentlevel  ,  value , setvalue}) => {
  const renderForm = () => {
    switch (Currentlevel) {
      case "maincategories": // "New Agent"
        return <SelectoptionHook fectParentKEY="mainCategory" setvalue={setvalue} value={value} title="منشأت الهيكل الرئيسى" />;
      case "categories": // "Main Branch"
        return <SelectoptionHook fectParentKEY="category" setvalue={setvalue} value={value} title="منشأت هيكل  فرعى تانى" /> ;
      case "subcategories": // "Subordinate to Main Branch"
        return <SelectoptionHook fectParentKEY="subCategory" setvalue={setvalue} value={value} title="منشأت هيكل  فرعى ثالث" />;
        case "nestsubcategories": // "Subsubordinate to Main Branch"
        return <SelectoptionHook fectParentKEY="nestSubCategory" setvalue={setvalue} value={value} title="منشأت هيكل  فرعى رابع" />;
      default:
        return <SelectoptionHook fectParentKEY="mainCategory" setvalue={setvalue} value={value} title="منشأت الهيكل الرئيسى" />;
    }
  };

  return (
    <div>
       {renderForm()}
    </div>
  )
}

export default RenderLevelsFlow