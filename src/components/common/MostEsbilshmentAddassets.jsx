import React from 'react';
import useQuerygetiteams from '../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';

const MostEsbilshmentAddassets = () => {
  const { data, isLoading } = useQuerygetiteams("assets", "assets");

  // Group data by building.name and count assets for each establishment
  const establishmentCounts = data?.data?.data?.reduce((acc, item) => {
    const establishment = item.building?.name;
    if (establishment) {
      acc[establishment] = (acc[establishment] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for the chart
  const establishments = Object.keys(establishmentCounts || {});
  const counts = Object.values(establishmentCounts || {});

  // Chart options for a pie/donut chart
  const chartOptions = {
    chart: {
      type: 'donut', // Use 'pie' for a pie chart or 'donut' for a donut chart
    },
    labels: establishments, // Establishment names
    title: {
      text: 'أكثر المنشآت إضافة للأصول',
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%', // Make the chart responsive
          },
          legend: {
            position: 'bottom', // Adjust legend position for smaller screens
          },
        },
      },
    ],
  };

  const chartSeries = counts; // Asset counts for each establishment

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!establishments.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>أكثر المنشآت إضافة للأصول</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Use 'pie' for a pie chart or 'donut' for a donut chart
        height={350}
      />
    </div>
  );
};

export default MostEsbilshmentAddassets;