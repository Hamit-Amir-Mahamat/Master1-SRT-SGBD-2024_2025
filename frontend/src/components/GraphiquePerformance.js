import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function GraphiquePerformance({data}) {
  return (
    <LineChart width={500} height={300} data={data}>
      <Line type="monotone" dataKey="note" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="exercice" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

