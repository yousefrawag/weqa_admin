import React from 'react'
import SelectFloor from '../../../../../components/ui/assets/Addasset/SelectFloor'
import SelectArea from '../../../../../components/ui/assets/Addasset/SelectArea'
import SelectSection from '../../../../../components/ui/assets/Addasset/SelectSection'
import SelectRooms from '../../../../../components/ui/assets/Addasset/SelectRooms'
import SelectoptionHook from '../../../../../hooks/SelectoptionHook'
import FetchassetName from '../../../../../hooks/FetchassetName'
import { useState } from 'react'
import RenderLevelsFlow from '../../../../../components/ui/Levels/RenderLevelsFlow'
const AssetFormmainData = ({continued ,Levels , SetCurrentLevel , Currentlevel ,  id ,location , CurrentFloor , params, setCurrentfloor  , building , setbuilding , setLocation  , CurrentSection , CurrentArea , setCurrentArea , setCurrentSection , CurrentRoom , setCurrentRoom}) => {

  return (
    <div>
     {/* RENDER LEVELS ITEAMS */}
     <span className='text-lg mb-4'>المنشأه</span>
     <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full mb-3'>
          {
            Levels.map((item) => {
              return    <button
              key={item.key}
              onClick={() => SetCurrentLevel(item.key)}
              className={`block text-white  ${Currentlevel === item.key ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
              type="button"
            >
                {item.name}
            </button>
            })
          }
        </div>
            <RenderLevelsFlow  Currentlevel={Currentlevel} value={building} setvalue={setbuilding}/>
              <SelectoptionHook fectParentKEY="location"  keyName = "location" title = "الموقع" value ={location} setvalue ={setLocation} params={params}/>

                <SelectFloor  location={location} CurrentFloor={CurrentFloor} setCurrentfloor={setCurrentfloor}/>
                <SelectArea   location={location} CurrentFloor={CurrentFloor} CurrentArea={CurrentArea} setCurrentArea={setCurrentArea} />
                  <SelectSection  location={location} CurrentFloor={CurrentFloor} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentSection={setCurrentSection}/>
                <SelectRooms  location={location} CurrentFloor={CurrentFloor} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentSection={setCurrentSection} CurrentRoom={CurrentRoom} setCurrentRoom={setCurrentRoom} />
              <FetchassetName  id={id}
              endpointKey={continued === "first" ? "mainCategoryAssets" : continued === "second" ? "categoryAssets" :  continued === "third" ? "subCategoryAssets" : "nestSubCategoryAssets"}/>
    </div>
  )
}

export default AssetFormmainData