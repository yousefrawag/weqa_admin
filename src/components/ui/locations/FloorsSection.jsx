import { useState } from "react";
import AreasSection from "./AreasSection";
const FloorsSection = ({ floors = [], Setfloors }) => {
    const [selectedFloor, setSelectedFloor] = useState("");
  
    const handelAdddooars = () => {
      if (selectedFloor) {
        Setfloors([...floors, { floorName: selectedFloor, areas: [] }]);
        setSelectedFloor(""); // Reset the selected floor after adding
      }
    };
  
    const handelDeleateFloor = (flooname) => {
      const updateFloor = floors.filter((item) => item.floorName !== flooname);
      Setfloors(updateFloor);
    };
    const handleSetAreas = (floorIndex, updatedAreas) => {
        const updatedFloors = [...floors];
        updatedFloors[floorIndex].areas = updatedAreas;
        Setfloors(updatedFloors);
      };
  
    return (
      <div className='w-full mt-4 mb-20 overflow-auto dark:border-form-strokedark dark:bg-form-input	'>
        <label className="mb-3 w-full text-xl font-medium text-gray-800 dark:text-white">الإدوار</label>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 dark:border-form-strokedark dark:bg-form-input">
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
          >
            <option value="">اختر الدور</option>
            {['أرضى', 'الإول', 'الثانى', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'].map(
              (floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              )
            )}
          </select>
          <button type="button" onClick={handelAdddooars} className="p-2 bg-main text-white rounded-md w-full mt-4 lg:w-[30%] lg:mt-0 ">
            إضافة
          </button>
        </div>
        {
          floors.length > 0 && (
            <div className='grid grid-cols-1 gap-4 w-full h-[300px] rounded-[9px] dark:border-form-strokedark dark:bg-form-input'>
              {floors.map((item, i) => (
                <div key={`${item.floorName}-${i + 1}`} className='w-full rounded-[9px] mt-4 p-3 h-full bg-white relative'>
                  <button type="button" className='absolute top-[10px] left-[10px] font-bold text-lg text-red-700' onClick={() => handelDeleateFloor(item.floorName)}>x</button>
                  <span className="w-[70px] p-4 rounded-[5px] bg-main text-white mt-2 inline-block">{item.floorName}</span>
                  <AreasSection areas={item.areas}   setAreas={(updatedAreas) => handleSetAreas(i, updatedAreas)}/>
                </div>
              ))}
            </div>
          )
        }
      </div>
    );
  };
  export default FloorsSection