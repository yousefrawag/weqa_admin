import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
const TreeNode = ({ node }) => {
    if (!node) return null;
  
    // Ensure child properties are arrays, not strings or undefined
    const categories = Array.isArray(node.categories) ? node.categories : [];
    const subcategories = Array.isArray(node.subcategories) ? node.subcategories : [];
    const nestSubCategory = Array.isArray(node.nestSubCategory) ? node.nestSubCategory : [];
  
    const hasChildren = categories.length > 0 || subcategories.length > 0 || nestSubCategory.length > 0;
  
    return (
      <div className="relative flex flex-col items-center">
        {/* Node Box */}
        <Link to={`/Establishment-overView/${node._id}/${node.levelsmodule}`} className="py-4 px-6 bg-white shadow-lg rounded-xl text-center flex flex-col items-center gap-2 border border-gray-300 w-64 max-w-full hover:shadow-2xl transition duration-300">
          <HiOutlineBuildingOffice2 className="text-4xl text-main" />
          <span className="text-lg font-semibold text-black">{node.name || "Unnamed Node"}</span>
        </Link>
  
        {/* Render Child Nodes */}
        {hasChildren && (
          <div className="flex flex-col items-center">
            <div className="w-1 h-10 bg-main mt-2"></div>
  
            <div className="flex flex-wrap justify-center mt-6 gap-3">
              {categories.length > 0 && (
                <div className="flex flex-col items-center">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <TreeNode key={cat._id} node={cat} />
                    ))}
                  </div>
                </div>
              )}
  
              {subcategories.length > 0 && (
                <div className="flex flex-col items-center">
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                    {subcategories.map((sub) => (
                      <TreeNode key={sub._id} node={sub} />
                    ))}
                  </div>
                </div>
              )}
  
              {nestSubCategory.length > 0 && (
                <div className="flex flex-col items-center">
             
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                    {nestSubCategory.map((nest) => (
                      <TreeNode key={nest._id} node={nest} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
export default TreeNode  