import React, { useState, useEffect } from "react";
import PermissionsGrid from "../../../../hooks/PermissionsGrid";
import useQuerygetiteams from "../../../../services/Querygetiteams";
import { FaFolder, FaFolderOpen, FaFileAlt } from "react-icons/fa";

const AssetsPermission = ({ setPermissions, setMainCategoryAssetsPermissions }) => {
  // Fetch data for main categories, categories, and subcategories
  const { data: mainCategoryAssets } = useQuerygetiteams("mainCategoryAssets", "mainCategoryAssets");
  const { data: categoryAssets } = useQuerygetiteams("categoryAssets", "categoryAssets");
  const { data: subCategoryAssets } = useQuerygetiteams("subCategoryAssets", "subCategoryAssets");

  // Filter types for the UI
  const filterTypes = [
    { key: "assets", name: "الإصول" },
    { key: "all-level", name: "فئات الإصول" },
  ];

  // State for selected filter type
  const [selectedType, setSelectedType] = useState("assets");

  // State for permissions (actions)
  const [permissions, setLocalPermissions] = useState({
    get: false,
    post: false,
    put: false,
    delete: false,
    financial: false,
    reports: false,
  });

  // State for allowed IDs (selected categories)
  const [allowedIds, setAllowedIds] = useState([]);

  // Update permissions and allowedIds in parent component
  useEffect(() => {
    // Extract selected actions
    const actions = Object.keys(permissions).filter((key) => permissions[key]);

    // Update permissions for assets
    setPermissions({
      actions,
      financial: {
        financial: permissions.financial,
        reports: permissions.reports,
      },
    });

    // Update permissions for mainCategoryAssets
    setMainCategoryAssetsPermissions({
      actions,
      allowedIds,
    });
  }, [permissions, allowedIds, setPermissions, setMainCategoryAssetsPermissions]);

  // Handle permission change (actions)
  const handlePermissionChange = (key) => {
    setLocalPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle category selection (toggle ID in allowedIds)
  const handleCategorySelect = (id) => {
    setAllowedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle "Select All" for a main category
  const handleSelectAll = (mainCategoryId) => {
    const mainCategory = mainCategoryAssets?.data?.data?.find((cat) => cat._id === mainCategoryId);
    const categories = categoryAssets?.data?.data?.filter((cat) => cat.mainCategoryId === mainCategoryId);
    const subCategories = subCategoryAssets?.data?.data?.filter((sub) =>
      categories.some((cat) => cat._id === sub.categoryId)
    );

    // Collect all IDs (main category, categories, and subcategories)
    const allIds = [mainCategoryId, ...categories.map((cat) => cat._id), ...subCategories.map((sub) => sub._id)];

    // Update allowedIds
    setAllowedIds((prev) => {
      const newIds = allIds.filter((id) => !prev.includes(id));
      return newIds.length > 0 ? [...prev, ...newIds] : prev.filter((id) => !allIds.includes(id));
    });
  };

  // Permissions data for the grid
  const permissionsData = [
    { key: "post", label: "إضافة أصل", value: permissions.post },
    { key: "get", label: "عرض الإصول", value: permissions.get },
    { key: "put", label: "تعديل الإصل", value: permissions.put },
    { key: "delete", label: "حذف أصل", value: permissions.delete },
    { key: "financial", label: "رؤيه بيانات ماليه", value: permissions.financial },
    { key: "reports", label: "تقارير تشغيلية", value: permissions.reports },
  ];

  // Render categories (main, category, and subcategory)
  const renderCategories = () => {
    if (!mainCategoryAssets?.data?.data || !categoryAssets?.data?.data || !subCategoryAssets?.data?.data) {
      return <p>Loading categories...</p>;
    }

    return mainCategoryAssets.data.data.map((mainCategory) => (
      <div key={mainCategory._id} className="pl-2">
        {/* Main Category */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allowedIds.includes(mainCategory._id)}
            onChange={() => handleSelectAll(mainCategory._id)}
          />
          <FaFolder className="text-yellow-500" />
          <span className="font-medium">{mainCategory.name}</span>
        </label>

        {/* Categories under Main Category */}
        <div className="pl-6">
          {categoryAssets.data.data
            .filter((cat) => cat.mainCategoryId === mainCategory._id)
            .map((category) => (
              <div key={category._id} className="pl-2">
                {/* Category */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowedIds.includes(category._id)}
                    onChange={() => handleCategorySelect(category._id)}
                  />
                  <FaFolderOpen className="text-blue-500" />
                  <span>{category.name}</span>
                </label>

                {/* Subcategories under Category */}
                <div className="pl-6">
                  {subCategoryAssets.data.data
                    .filter((sub) => sub.categoryId === category._id)
                    .map((subCategory) => (
                      <label key={subCategory._id} className="flex items-center gap-2 cursor-pointer pl-2">
                        <input
                          type="checkbox"
                          checked={allowedIds.includes(subCategory._id)}
                          onChange={() => handleCategorySelect(subCategory._id)}
                        />
                        <FaFileAlt className="text-gray-600" />
                        <span>{subCategory.name}</span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full h-full shadow-lg overflow-auto p-4">
      {/* Filter Buttons */}
      <div className="w-full mb-4 flex gap-5">
        {filterTypes.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedType(item.key)}
            type="button"
            className={`block text-white ${
              selectedType === item.key ? "bg-main2" : "bg-main"
            } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Render Permissions Grid or Categories */}
      {selectedType === "assets" ? (
        <PermissionsGrid
          sectionName="الإصول"
          permissions={permissionsData}
          handlePermissionChange={handlePermissionChange}
        />
      ) : (
        <div className="w-full p-4 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="text-lg font-semibold mb-3">فئات الإصول</h3>
          <div className="space-y-3">{renderCategories()}</div>
        </div>
      )}
    </div>
  );
};

export default AssetsPermission;