import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Customers", value: 350 },
  { name: "Brands", value: 200 },
  { name: "Products", value: 500 },
  { name: "Locations", value: 150 },
];

const BarChartGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Tooltip cursor={false} />
        <Bar dataKey="value" fill="#8884d8" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGraph;
