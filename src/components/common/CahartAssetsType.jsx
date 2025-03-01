import React from 'react';
import useQuerygetiteams from '../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';

const CahartAssetsType = () => {
  const { data, isLoading } = useQuerygetiteams("assets", "assets");

  // Group data by assettype and count assets for each type
  const assetTypeCounts = data?.data?.data?.reduce((acc, item) => {
    const assetType = item.assettype; // Get the asset type
    if (assetType) {
      // If the asset type exists, increment its count
      acc[assetType] = (acc[assetType] || 0) + 1;
    }
    return acc; // Return the accumulator for the next iteration
  }, {});

  // Prepare data for the chart
  const categories = Object.keys(assetTypeCounts || {}); // Asset types
  const counts = Object.values(assetTypeCounts || {}); // Counts for each asset type

  // Chart options for a pie/donut chart
  const chartOptions = {
    chart: {
      type: 'donut', // Use 'pie' for a pie chart or 'donut' for a donut chart
    },
    labels: categories, // Asset type names
    title: {
      text: 'عدد الأصول حسب النوع',
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

  const chartSeries = counts; // Asset counts for each type

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!categories.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>عدد الأصول حسب النوع</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Use 'pie' for a pie chart or 'donut' for a donut chart
        height={350}
      />
    </div>
  );
};

export default CahartAssetsType;