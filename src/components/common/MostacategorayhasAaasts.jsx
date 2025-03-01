import React from 'react';
import useQuerygetiteams from '../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';

const MostacategorayhasAaasts = () => {
  const { data, isLoading } = useQuerygetiteams("assets", "assets");

  // Group data by subCategoryAssets.name and count assets for each category
  const categoryCounts = data?.data?.data?.reduce((acc, item) => {
    const category = item.subCategoryAssets[0]?.name; // Get the category name
    if (category) {
      // If the category exists, increment its count
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc; // Return the accumulator for the next iteration
  }, {});

  // Prepare data for the chart
  const categories = Object.keys(categoryCounts || {});
  const counts = Object.values(categoryCounts || {});

  // Chart options for a pie/donut chart
  const chartOptions = {
    chart: {
      type: 'donut', // Use 'pie' for a pie chart or 'donut' for a donut chart
    },
    labels: categories, // Category names
    title: {
      text: 'عدد الأصول لكل فئة',
      align: 'center',
      style: {
        color: '#000000', // Set title color
      },
    },
    colors: ['#804DB8', '#00E396', '#FEB019', '#FF4560', '#775DD0'], // Custom colors for each slice
    legend: {
      position: 'bottom', // Position of the legend
      labels: {
        colors: '#000000', // Legend text color
      },
    },
  };

  const chartSeries = counts; // Asset counts for each category

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!categories.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>عدد الأصول لكل فئة</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Use 'pie' for a pie chart or 'donut' for a donut chart
        height={350}
      />
    </div>
  );
};

export default MostacategorayhasAaasts;