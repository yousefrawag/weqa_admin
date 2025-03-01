import React from 'react';
import useQuerygetiteams from '../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';

const AssetsKindChart = () => {
  const { data, isLoading } = useQuerygetiteams("assets", "assets");

  // Filter assets by kind
  const AseetsNeadmaintenance = data?.data?.data?.filter((item) => item.kind === "بحاجة لصيانة");
  const AseetsDontneddmaintenance = data?.data?.data?.filter((item) => item.kind === "صالح الإستخدام");
  const AseetsNotneedmaintenance = data?.data?.data?.filter((item) => item.kind === "غير صالح للإستخدام");

  // Prepare data for the chart
  const categories = ['بحاجة لصيانة', 'صالح الإستخدام', 'غير صالح للإستخدام']; // Labels for the chart
  const counts = [
    AseetsNeadmaintenance?.length || 0,
    AseetsDontneddmaintenance?.length || 0,
    AseetsNotneedmaintenance?.length || 0,
  ]; // Counts for each kind

  // Chart options for a pie/donut chart
  const chartOptions = {
    chart: {
      type: 'donut', // Use 'pie' for a pie chart or 'donut' for a donut chart
    },
    labels: categories, // Category names
    title: {
      text: 'عدد الأصول حسب الحالة',
      align: 'center',
      style: {
        color: '#000000', // Set title color
      },
    },
    colors: ['#804DB8', '#00E396', '#FEB019'], // Custom colors for each slice
    legend: {
      position: 'bottom', // Position of the legend
      labels: {
        colors: '#000000', // Legend text color
      },
    },
  };

  const chartSeries = counts; // Asset counts for each kind

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!data?.data?.data?.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>عدد الأصول حسب الحالة</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Use 'pie' for a pie chart or 'donut' for a donut chart
        height={350}
      />
    </div>
  );
};

export default AssetsKindChart;