import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
import useGetAllGrade from "../../func/getAllGrade";

function GpaLineChart() {
  const { grades, loading } = useGetAllGrade();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!loading && grades?.semesterGPA) {
      const newData = Object.entries(grades.semesterGPA).map(([sem, info]) => ({
        year: sem,
        value: parseFloat(info.gpa),
      }));
      setChartData(newData);
      // console.log("Chart data:", newData);
    }
  }, [grades, loading]);
  const data = chartData
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };


  return (
    <div style={{ width: "100%", height: 400 }}>
      <Line {...config} />
    </div>
  );
}

export default GpaLineChart;
