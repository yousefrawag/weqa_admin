import React from 'react';
import Breadcrumb from '../../../components/common/Breadcrumbs/Breadcrumb';
import MdouleAddCategoray from '../../../components/common/popupmdules/MdouleAddCategoray';
import { useDashboardContext } from '../../../context/DashboardProviedr';
import useQuerygetiteams from '../../../services/Querygetiteams';
import EditmainCategory from '../../../components/common/popupmdules/EditModal';
import LevelItem from '../../../components/ui/Levels/LevelItem';
const Levels = () => {
  const { setmodule  } = useDashboardContext();
  // custome fetch data Levels
  const {
    isError,
    isLoading,
    data: categoryes,
  } = useQuerygetiteams('mainCategory', 'mainCategory');


 

  return (
    <div>
            {/* main section header */}
            <div className="flex justify-between w-full">
              <Breadcrumb pageName="مستويات" />
              <button
                onClick={() => setmodule(true)}
                className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
                type="button"
              >
                إضافه هيكل جديد
              </button>
            </div>
            {/* main section header */}
            
            {/* RENDER LEVELS TREE */}
              <div className="p-6  min-h-screen flex flex-col gap-20 justify-center space-x-8">
                    {categoryes?.data?.data?.map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center shadow-md p-4 border border-main2 rounded-2">
                        <LevelItem level={item} />
                      </div>
                    ))}
              </div>
          {/* RENDER LEVELS TREE */}

            {/* modules popup */}

            <MdouleAddCategoray />
            <EditmainCategory />
            {/* modules popup */}
    </div>
  );
};

export default Levels;
