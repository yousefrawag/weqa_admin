import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

const EstbilshLevel = ({ data }) => {
  const CurrenEstbilshment = data?.building;
  const RelatedBuilding = data?.relatedBuildings;
  const filterBuilding = RelatedBuilding.filter(
    (item) => item.levels !== CurrenEstbilshment?.levels?._id
  );

  return (
    <div className="w-full h-full flex flex-col items-center mt-10 px-4">
      {/* Main Establishment */}
      <div className="relative flex flex-col items-center">
        <div className="py-4 px-6 bg-white shadow-lg rounded-xl text-center flex flex-col items-center gap-2 border border-gray-300 w-64 max-w-full">
          <HiOutlineBuildingOffice2 className="text-4xl text-main" />
          <span className="text-lg font-semibold text-black">{CurrenEstbilshment.name}</span>
        </div>

        {/* Connector to subcategories */}
        {filterBuilding.length > 0 && (
          <div className="w-1 h-6 bg-main mt-1"></div>
        )}
      </div>

      {/* Subcategories */}
      {filterBuilding.length > 0 && (
        <div className="relative w-full max-w-5xl flex flex-wrap justify-center mt-6">
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-main"></div>

          {/* Subcategories grid (responsive) */}
          <div className="flex flex-wrap justify-center gap-6">
            {filterBuilding.map((subcategory, index) => (
              <Link
                key={index}
                to={`/Establishment-overView/${subcategory?._id}`}
                className="relative flex flex-col items-center w-48 max-w-full"
              >
                {/* Vertical connector */}
                <div className="w-1 h-6 bg-main"></div>

                {/* Subcategory box */}
                <div className="py-4 px-6 bg-white shadow-lg rounded-xl text-center flex flex-col items-center gap-2 border border-gray-300 w-full">
                  <HiOutlineBuildingOffice2 className="text-3xl text-main" />
                  <span className="text-md font-medium text-black">{subcategory.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EstbilshLevel;
