import React from 'react';
import Breadcrumb from '../../../components/common/Breadcrumbs/Breadcrumb';
import CardAsset from '../../../components/common/CardAsset';
import useQuerygetSpacficIteam from '../../../services/QuerygetSpacficIteam';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/common/Loader';
import { useDashboardContext } from '../../../context/DashboardProviedr';
import AddAssethook from '../../../hooks/AddAssethook';
import { useState } from 'react';

const CardLevelCategoray = ({id , fetchkey , keyname , continued}) => {
    
    const { data, isLoading } = useQuerygetSpacficIteam(fetchkey, fetchkey, id);
      const {setModuleAddAsset } = useDashboardContext()
    const [isDropdownVisible, setDropdownVisible] = useState(null);
  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };
    // Handle loading state
    if (isLoading) {
        return <Loader />
    }

    // Extract categories safely
    const categories = fetchkey === "mainCategoryAssets" ? data?.data?.categoryAssets : data?.data?.subCategoryAssets || [];


    // Helper function to render categories
    const renderCategories = () => {
        if (Array.isArray(categories)) {
            // If it's an array, map over it
            return categories.map((category) => (
                <CardAsset
                    key={category._id}
                    img={category.image}
                    enddpointDelete={fetchkey === "mainCategoryAssets" ?  "categoryAssets" :"subCategoryAssets" }
                    id={category._id}
                    to={ `/Assets/${category?._id}/${continued}` }
                      keydelete={fetchkey === "mainCategoryAssets" ?  "mainCategoryAssets" :"categoryAssets" }
                    hasSub={true} tosub={`/Assets-Subcategory/${category?._id}`} 
                    title={category.name}
                    isDropdownVisible={isDropdownVisible === category._id } toggleDropdown={toggleDropdown}
                />
            ));
        } else if (categories && typeof categories === 'object') {
            // If it's a single object, return one card
            return (
                <CardAsset
                    key={categories._id}
                    img={categories.image}
                    enddpointDelete={fetchkey === "mainCategoryAssets" ?  "categoryAssets" :"subCategoryAssets" }
                    keydelete={fetchkey === "mainCategoryAssets" ?  "mainCategoryAssets" :"categoryAssets" }                    to={ `/Assets/${category?._id}/${continued}` }
                    hasSub={true} tosub={`/Assets-Subcategory/${category?._id}`}                   title={categories.name}
                    isDropdownVisible={isDropdownVisible === category?._id}
                    toggleDropdown={toggleDropdown}
                />
            );
        } 
    };

    return (
        <div className='w-full'>
            {/* HEAD PAGE STYLE */}
              <div className="flex justify-between w-full">
               {
                continued === "third" ? null : <button
                onClick={() => setModuleAddAsset(true)}
               className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
               type="button"
           >
               إضافه فرع جديد
           </button>
               }
                 
              </div>
          
          

            {/* CARD ASSET STYLE */}
            <div className="p-3  grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5  mb-5 space-x-8">
                {renderCategories()}
            </div>
            <AddAssethook 
            id={id} 
            endpoint={fetchkey === "mainCategoryAssets" ? "categoryAssets" : "subCategoryAssets"} 
            keyName={fetchkey === "mainCategoryAssets" ? "mainCategoryAssets" : "categoryAssets"}  
            fectParentKEY={fetchkey === "mainCategoryAssets" ? "mainCategoryAssets" : "categoryAssets"}  
            ismainLevel={false} 
/>

        </div>
    );
};

export default CardLevelCategoray;
