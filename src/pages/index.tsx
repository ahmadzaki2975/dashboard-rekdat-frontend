import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/bmkg?sdate=2023-11-19&edate=2023-11-20&city=Sleman"
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <main className="bg-white min-h-screen flex flex-col justify-center items-center font-poppins">
      <h1 className="font-bold text-[25px]">
        Weather and Air Quality Dashboard
      </h1>
      {/* <LineChart width={500} height={300} data={[1, 2, 3]}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart> */}
    </main>
  );
}
