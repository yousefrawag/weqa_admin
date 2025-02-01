import React from 'react'
import SelectFloor from '../../../../../components/ui/assets/Addasset/SelectFloor'
import SelectArea from '../../../../../components/ui/assets/Addasset/SelectArea'
import SelectSection from '../../../../../components/ui/assets/Addasset/SelectSection'
import SelectRooms from '../../../../../components/ui/assets/Addasset/SelectRooms'
import SelectoptionHook from '../../../../../hooks/SelectoptionHook'
import FetchassetName from '../../../../../hooks/FetchassetName'
const AssetFormmainData = ({continued , id ,location , CurrentFloor , params, setCurrentfloor  , building , setbuilding , setLocation  , CurrentSection , CurrentArea , setCurrentArea , setCurrentSection , CurrentRoom , setCurrentRoom}) => {
  return (
    <div>
         <SelectoptionHook fectParentKEY="building"  keyName = "building" title = "المنشأه" value ={building} setvalue ={setbuilding}/>
              <SelectoptionHook fectParentKEY="location"  keyName = "location" title = "الموقع" value ={location} setvalue ={setLocation} params={params}/>

                <SelectFloor  location={location} CurrentFloor={CurrentFloor} setCurrentfloor={setCurrentfloor}/>
                <SelectArea   location={location} CurrentFloor={CurrentFloor} CurrentArea={CurrentArea} setCurrentArea={setCurrentArea} />
                  <SelectSection  location={location} CurrentFloor={CurrentFloor} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentSection={setCurrentSection}/>
                <SelectRooms  location={location} CurrentFloor={CurrentFloor} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentSection={setCurrentSection} CurrentRoom={CurrentRoom} setCurrentRoom={setCurrentRoom} />
              <FetchassetName  id={id}
              endpointKey={continued === "first" ? "mainCategoryAssets" : continued === "second" ? "categoryAssets" : "subCategoryAssets"}/>
    </div>
  )
}

export default AssetFormmainData