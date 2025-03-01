import React from 'react';
import useQuerygetiteams from '../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';

const MostestbilshmenthasLocations = () => {
  const { data, isLoading } = useQuerygetiteams("location", "location");

  // Group data by building.name and count locations for each establishment
  const establishmentCounts = data?.data?.data?.reduce((acc, item) => {
    const establishment = item?.building?.name; // Get the establishment name
    if (establishment) {
      // If the establishment name exists, increment its count
      acc[establishment] = (acc[establishment] || 0) + 1;
    }
    return acc; // Return the accumulator for the next iteration
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
      text: 'أكثر المنشآت إضافة للمواقع',
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

  const chartSeries = counts; // Location counts for each establishment

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!establishments.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>أكثر المنشآت إضافة للمواقع</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Use 'pie' for a pie chart or 'donut' for a donut chart
        height={350}
      />
    </div>
  );
};

export default MostestbilshmenthasLocations;