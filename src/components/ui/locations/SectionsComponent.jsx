import RoomsComponent from "./RoomsComponent";
import { useState } from "react";
const SectionsComponent = ({ sections = [], setSections }) => {
    const [sectionName, setSectionName] = useState("");
  
    const handleAddSection = () => {
      if (sectionName) {
        setSections([...sections, { name: sectionName, rooms: [] }]);
        setSectionName("");
      }
    };
  
    const handleDeleteSection = (sectionName) => {
      const updatedSections = sections.filter((section) => section.name !== sectionName);
      setSections(updatedSections);
    };
  
    const handleSetRooms = (sectionIndex, updatedRooms) => {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].rooms = updatedRooms;
      setSections(updatedSections);
    };
  
    return (
      <div className="p-4">
        <h4 className="font-bold mb-2">الإقسام</h4>
        <input
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="ادخل القسم"
          className="border p-2 rounded-md w-full"
        />
        <button type="button" onClick={handleAddSection} className="bg-main text-white p-2 mt-2 rounded-md">
         إضافة قسم
        </button>
        <ul className="mt-4">
          {sections.map((section, index) => (
            <li key={index} className="p-2 border rounded-md mb-2">
              <div className="flex justify-between items-center">
                <span>{section.name}</span>
                <button
                  onClick={() => handleDeleteSection(section.name)}
                  className="text-red-600"
                  type="button"
                >
                  حذف
                </button>
              </div>
              <RoomsComponent
                rooms={section.rooms}
                setRooms={(updatedRooms) => handleSetRooms(index, updatedRooms)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default SectionsComponent