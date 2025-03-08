import React from 'react';
import useQuerygetiteams from '../../../../services/Querygetiteams';
import ReactApexChart from 'react-apexcharts';

const GetEstbilshassetsFinince = ({id}) => {
    const params = {
        building:id
    }
  const { data, isLoading } = useQuerygetiteams("assets", "assets" , params  );

  // Filter assets with financialValue
  const assetsData = data?.data?.data?.filter((item) => item.financialValue !== ""  || item.financialValue !== 0);

  // Group data by subCategoryAssets.name and calculate total financialValue for each category
  const categoryTotals = assetsData?.reduce((acc, item) => {
    const category = item.subCategoryAssets[0]?.name;
    const value = parseFloat(item.financialValue) || 0; // Ensure financialValue is a number
    if (category) {
      acc[category] = (acc[category] || 0) + value;
    }
    return acc;
  }, {});
  console.log("assets" , assetsData);
  

  // Prepare data for the chart
  const categories = Object.keys(categoryTotals || {});
  const totals = Object.values(categoryTotals || {});

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar', // You can change this to 'pie' for a pie chart
    },
    xaxis: {
      categories: categories, // Category names
    },
    title: {
      text: 'إجمالى القيمة المالية الإصول لكل فئة',
      align: 'center',
    },
  };

  const chartSeries = [
    {
      name: 'إجمالى القيمه الماليه',
      data: totals, // Total financial values
    },
  ];

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // If no data is available, display a fallback message
  if (!categories.length) {
    return <div>لا توجد بيانات لعرضها</div>;
  }

  return (
    <div className='mt-10'>
      <span className='mb-5'>إجمالى قيمه الإصول</span>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar" // Change to 'pie' for a pie chart
        height={350}
      />
    </div>
  );
};

export default GetEstbilshassetsFinince;