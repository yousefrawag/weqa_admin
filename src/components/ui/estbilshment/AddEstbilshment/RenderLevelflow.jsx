import React from 'react'
import EstbilshLevel2 from './EstbilshLevel2';
import EstbilshLevelone from './EstbilshLevelone';
import EstbilshLevel3 from './EstbilshLevel3';
import EstbilshLevel4 from './EstbilshLevel4';
const RenderLevelflow = ({Currentlevel , handeupdateLevel, updatelevel , name}) => {
  const renderLevel = () => {
    switch (Currentlevel) {
      case "first": // "New Agent"
        return <EstbilshLevelone  handeupdateLevel={handeupdateLevel} updatelevel={updatelevel} name={name}/>;
      case "second": // "Main Branch"
        return <EstbilshLevel2  handeupdateLevel={handeupdateLevel} updatelevel={updatelevel} name={name}/>;
      case "third": // "Subordinate to Main Branch"
        return <EstbilshLevel3 handeupdateLevel={handeupdateLevel} updatelevel={updatelevel} name={name} />;
        case "fourth": // "Subsubordinate to Main Branch"
        return <EstbilshLevel4 handeupdateLevel={handeupdateLevel} updatelevel={updatelevel} name={name}/>;
      default:
        return <EstbilshLevelone handeupdateLevel={handeupdateLevel} updatelevel={updatelevel} name={name} />;
    }
  }
  return (
    renderLevel()
  )
}

export default RenderLevelflow