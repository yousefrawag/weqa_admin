import { useState } from "react";
import SectionsComponent from "./SectionsComponent";
const AreasSection = ({ areas = [], setAreas }) => {
  const [areaName, setAreaName] = useState("");

  const handleAddArea = () => {
    if (areaName) {
      setAreas([...areas, { name:areaName, sections: [] }]);
      setAreaName("");
    }
  };

  const handleDeleteArea = (areaName) => {
    const updatedAreas = areas.filter((area) => area.name !== areaName);
    setAreas(updatedAreas);
  };

  const handleSetSections = (areaIndex, updatedSections) => {
    const updatedAreas = [...areas];
    updatedAreas[areaIndex].sections = updatedSections;
    setAreas(updatedAreas);
  };

  return (
    <div className="p-4">
      <h4 className="font-bold mb-2">المناطق</h4>
      <input
        type="text"
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
        placeholder="ادخل اسم منطقة"
        className="border p-2 rounded-md w-full"
      />
      <button type="button" onClick={handleAddArea} className="bg-main text-white p-2 mt-2 rounded-md">
      إضافة منطقة
      </button>
      <ul className="mt-4">
        {areas.map((area, index) => (
          <li key={index} className="p-2 border rounded-md mb-2">
            <div className="flex justify-between items-center">
              <span>{area.name}</span>
              <button
                onClick={() => handleDeleteArea(area.name)}
                className="text-red-600"
                type="button"
              >
                حذف
              </button>
            </div>
            <SectionsComponent
              sections={area.sections}
              setSections={(updatedSections) => handleSetSections(index, updatedSections)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AreasSection