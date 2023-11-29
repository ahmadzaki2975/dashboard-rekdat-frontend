import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

export default function Home() {
  const [data, setData] = useState([]);
  const [edate, setEdate] = useState("");
  const [sdate, setSdate] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/join?sdate=2023-11-19&edate=2023-11-20&city=Sleman"
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

      <form className="grid grid-cols-3 gap-5">
        <label className="flex flex-col gap-1">
          Start Date
          <input
            type="date"
            className="outline-1 outline rounded-[5px] px-2 py-1"
            onChange={(e) => setSdate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          End Date
          <input
            type="date"
            className="outline-1 outline rounded-[5px] px-2 py-1"
            onChange={(e) => setSdate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          City
          <input
            type="text"
            className="outline-1 outline rounded-[5px] px-2 py-1"
            onChange={(e) => setSdate(e.target.value)}
          />
        </label>
      </form>

      <div>
        <LineChart width={1000} height={500} data={data}>
          <XAxis dataKey="jamcuaca" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="iqa" stroke="#8884d8" />
          <Line type="monotone" dataKey="tempc" stroke="#82ca9d" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          {/* <Line type="monotone" dataKey="pressure_mbar" stroke="#82ca9d" /> */}
          <Tooltip />
        </LineChart>
      </div>
    </main>
  );
}
