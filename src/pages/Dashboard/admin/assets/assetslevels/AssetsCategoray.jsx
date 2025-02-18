import React from 'react';
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb';
import CardAsset from '../../../../../components/common/CardAsset';
import useQuerygetSpacficIteam from '../../../../../services/QuerygetSpacficIteam';
import { useParams } from 'react-router-dom';
import Loader from '../../../../../components/common/Loader';
import { useDashboardContext } from '../../../../../context/DashboardProviedr';
import AddAssethook from '../../../../../hooks/AddAssethook';
import { useState } from 'react';
import useGetUserAuthentications  from '../../../../../middleware/GetuserAuthencations'

const AssetsCategoray = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuerygetSpacficIteam("mainCategoryAssets", "mainCategoryAssets", id);
      const {setModuleAddAsset } = useDashboardContext()
      const {isOwner, iscanAdd} = useGetUserAuthentications ("mainCategoryAssets")

    const [isDropdownVisible, setDropdownVisible] = useState(null);
  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };
    // Handle loading state
    if (isLoading) {
        return <Loader />
    }

    // Extract categories safely
    const categories = data?.data?.categoryAssets;
console.log(categories);

    // Helper function to render categories
    const renderCategories = () => {
        if (Array.isArray(categories)) {
            // If it's an array, map over it
            return categories.map((category) => (
                <CardAsset
                    key={category._id}
                    img={category.image}
                    parentid={id}
                    enddpointDelete="categoryAssets" 
                    item={category}
                    id={category._id}
                    to={ `/Assets/${category?._id}/second` }
                      keydelete="mainCategoryAssets"
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
                    enddpointDelete="categoryAssets" 
                    parentid={id}
                    item={category}
                    keydelete="mainCategoryAssets"
                    to={ `/Assets/${category?._id}/second` }
                    hasSub={true} tosub={`/Assets-Subcategory/${category?._id}`}                   title={categories.name}
                    isDropdownVisible={isDropdownVisible === category?._id}
                    toggleDropdown={toggleDropdown}
                />
            );
        } 
    };

    return (
        <div className='w-full h-full'>
            {/* HEAD PAGE STYLE */}
            <div className="flex justify-between w-full">
                <Breadcrumb pageName={' /خراطيم مرشات / ${الأمن والسلامة}'} />
                {
                    iscanAdd || isOwner ?    <button
                    onClick={() => setModuleAddAsset(true)}
                   className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                   type="button"
               >
                   إضافه فرع جديد
               </button> : null
                }
             
            </div>

            {/* CARD ASSET STYLE */}
            <div className="p-3 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 space-x-8">
                {renderCategories()}
            </div>
            <AddAssethook id={id} endpoint ="categoryAssets" keyName ="mainCategoryAssets"  fectParentKEY ="mainCategoryAssets"  ismainLevel = {false} />

        </div>
    );
};

export default AssetsCategoray;
