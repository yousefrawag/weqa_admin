import { useState } from "react";
const RoomsComponent = ({ rooms = [], setRooms }) => {
    const [roomName, setRoomName] = useState("");
  
    const handleAddRoom = () => {
      if (roomName) {
        setRooms([...rooms, { name: roomName }]);
        setRoomName("");
      }
    };
  
    const handleDeleteRoom = (roomName) => {
      const updatedRooms = rooms.filter((room) => room.name !== roomName);
      setRooms(updatedRooms);
    };
  
    return (
      <div className="p-4">
        <h4 className="font-bold mb-2">الغرف</h4>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="ادخل اسم الغرفة"
          className="border p-2 rounded-md w-full"
        />
        <button type="button" onClick={handleAddRoom} className="bg-primary text-white p-2 mt-2 rounded-md">
         إضافة غرفة
        </button>
        <ul className="mt-4">
          {rooms.map((room, index) => (
            <li key={index} className="flex justify-between">
              {room.name}
              <button
                onClick={() => handleDeleteRoom(room.name)}
                className="text-red-600"
                type="button"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default RoomsComponent