import React from 'react';
import useQuerygetiteams from '../../../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const EstbilshLocationtypeschart = ({id}) => {
    const params = {
        building:id
    }
  const { data, isLoading } = useQuerygetiteams("location", "location" , params);

  // Filter locations by type
  const inDoorLOcation = data?.data?.data?.filter((item) => item.kind === "indoor");
  const outDoorLOcation = data?.data?.data?.filter((item) => item.kind === "outdoor");

  // Prepare data for the chart
  const categories = ['داخلي', 'خارجي']; // Labels for the chart
  const counts = [inDoorLOcation?.length || 0, outDoorLOcation?.length || 0]; // Counts for each type

  // Chart options for a pie/donut chart
  const chartOptions = {
    chart: {
      type: 'donut', // Use 'pie' for a pie chart or 'donut' for a donut chart
    },
    labels: categories, // Category names
    title: {
      text: 'عدد المواقع حسب النوع',
      align: 'center',
      style: {
        color: '#000000', // Set title color
      },
    },
    colors: ['#804DB8', '#00E396'], // Custom colors for each slice
    legend: {
      position: 'bottom', // Position of the legend
      labels: {
        colors: '#000000', // Legend text color
      },
    },
  };

  const chartSeries = counts; // Location counts for each type

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!data?.data?.data?.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>عدد المواقع حسب النوع</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Use 'pie' for a pie chart or 'donut' for a donut chart
        height={350}
      />
    </div>
  );
};

export default EstbilshLocationtypeschart;