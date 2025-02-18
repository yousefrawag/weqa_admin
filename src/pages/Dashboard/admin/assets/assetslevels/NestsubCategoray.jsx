import React from 'react'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
import CardAsset from '../../../../../components/common/CardAsset'
import { useParams } from 'react-router-dom';
import Loader from '../../../../../components/common/Loader';
import { useDashboardContext } from '../../../../../context/DashboardProviedr';
import AddAssethook from '../../../../../hooks/AddAssethook';
import useQuerygetSpacficIteam from '../../../../../services/QuerygetSpacficIteam';
import { useState } from 'react';
import useGetUserAuthentications  from '../../../../../middleware/GetuserAuthencations'

const NestsubCategoray = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuerygetSpacficIteam("subCategoryAssets", "subCategoryAssets", id);
    const {setModuleAddAsset } = useDashboardContext()
    const [isDropdownVisible, setDropdownVisible] = useState(null);
    const {isOwner, iscanAdd} = useGetUserAuthentications ("mainCategoryAssets")

      const toggleDropdown = (id) => {
        setDropdownVisible((prev) => (prev === id ? null : id));
      };
       // Handle loading state
       if (isLoading) {
        return <Loader />
    }

    // Extract categories safely
    const categories = data?.data?.nestSubCategoryAssets;


    // Helper function to render categories
    const renderCategories = () => {
        if (Array.isArray(categories)) {
            // If it's an array, map over it
            return categories.map((category) => (
                <CardAsset
                    key={category._id}
                    img={category.image}
                    parentid={id}
                    hasSub={false}
                    item={categories}
                    keydelete="nestSubCategoryAssets" 
                     enddpointDelete="nestSubCategoryAssets"
                    to={`/Assets/${category._id}/fourth`}
                    title={category.name}
                    isDropdownVisible={isDropdownVisible === categories._id } toggleDropdown={toggleDropdown}
                />
            ));
        } else if (categories && typeof categories === 'object') {
            // If it's a single object, return one card
            return (
                <CardAsset
                    key={categories._id}
                    img={categories.image}
                    parentid={id}
                    hasSub={false}
                    item={categories}
                    enddpointDelete="nestSubCategoryAssets"
                    to={`/Assets/${categories._id}/fourth`}
                    title={categories.name}
                    keydelete="nestSubCategoryAssets" 
                    isDropdownVisible={isDropdownVisible === categories._id } toggleDropdown={toggleDropdown}
                />
            );
        } 
    };
  return (
    <div className='w-full h-full'>
        {/* HEAD PAGE STYLE */}
     <div className="flex justify-between w-full">
              <Breadcrumb pageName="فئات الإصول" />
              {
                iscanAdd || isOwner ? <button
                onClick={() => setModuleAddAsset(true)}
              className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
              type="button"
            >
              إضافه فئة جديد
            </button> : null
              }
             
            </div>
            {/* CARD ASSET STYLE  */}
            <div className="p-3  min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 space-x-8">
            {
              renderCategories()
            }
             </div>
             <AddAssethook id={id} endpoint ="nestSubCategoryAssets" keyName ="subCategoryAssets"  fectParentKEY ="subCategoryAssets"  ismainLevel = {false} />

    </div>
  )
}

export default NestsubCategoray