import React from 'react'
import AddLeve1 from './AddLeve1'
import AddLevel2 from './AddLevel2'
import AddLevel3 from './AddLevel3'
import AddLevel4 from './AddLevel4'
const RenderAddlevel = ({Currentlevel , placeholder}) => {
  const renderForm = () => {
    switch (Currentlevel) {
      case "هيكل جديد": // "New Agent"
        return <AddLeve1 placeholder={placeholder} />;
      case "هيكل فرعى": // "Main Branch"
        return <AddLevel2 placeholder={placeholder}/>;
      case "هيكل فرعى ثالث": // "Subordinate to Main Branch"
        return <AddLevel3 placeholder={placeholder}/>;
        case "هيكل فرعى رابع": // "Subsubordinate to Main Branch"
        return <AddLevel4 placeholder={placeholder}/>;
      default:
        return <AddLeve1 placeholder={placeholder}/>;
    }
  };

  return (
    <div>
       {renderForm()}
    </div>
  )
}

export default RenderAddlevel