import React from 'react';

const LocationFloorSection = ({ CurrentLocation }) => {
  return (
    <div className="w-full h-full grid grid-cols-1  mt-10 gap-4">
      {CurrentLocation?.floors?.map((floor) => (
        <div key={floor._id} className="w-full h-full shadow-md border border-gray-500 p-3">
          <span className="font-bold">{floor?.floorName}</span>
          {floor?.areas?.map((area) => (
            <div key={area._id} className="shadow-md border border-gray-500 p-3 mt-2">
              <span className="font-semibold">{area?.name}</span>
              {area?.sections?.map((section) => (
                <div key={section._id} className="border border-gray-500 p-3 mt-2">
                  <span className="font-medium">{section?.name}</span>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2">
                    {section?.rooms?.map((room) => (
                      <span key={room._id} className="border border-gray-500 p-2">
                        {room?.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LocationFloorSection;
