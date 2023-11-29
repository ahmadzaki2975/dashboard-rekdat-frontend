import CustomTooltip from "@/components/CustomTooltip";
import axios from "axios";
import dynamic from "next/dynamic";
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

function Home() {
  const [data, setData] = useState([]);
  const [sdate, setSdate] = useState("2023-11-20");
  const [edate, setEdate] = useState("2023-11-21");
  const [city, setCity] = useState("Sleman");
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const FormatDate = (date: string) => {
    // format to yyyy-mm-dd
    let d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    return [year, month, day].join("-");
  };

  function toPascalCase(str: string) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    setLoading(true);
    console.log(toPascalCase(city));
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `/join?sdate=${sdate}&edate=${edate}&city=${toPascalCase(city)}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        if (res.data.length === 0 && toPascalCase(city) !== "Sleman") {
          alert("No Data");
          setSdate("2023-11-20");
          setEdate("2023-11-21");
          setCity("Sleman");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetch]);
  return (
    <main className="bg-white min-h-screen flex flex-col justify-start py-10 items-center font-poppins">
      <h1 className="font-bold text-[25px]">
        Weather and Air Quality Dashboard
      </h1>

      <form
        className="grid grid-cols-4 gap-5 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            sdate.includes("'") ||
            edate.includes("'") ||
            city.includes("'") ||
            sdate.includes(";") ||
            edate.includes(";") ||
            city.includes(";")
          ) {
            return alert("Invalid Input");
          }
          if (sdate > edate) return alert("Start Date must be before End Date");
          if (city === "") {
            setCity("Sleman");
            alert("City must be filled");
          }
          setRefetch(!refetch);
        }}
      >
        <label className="flex flex-col gap-1">
          Start Date
          <input
            type="date"
            className="outline-1 outline rounded-[5px] px-2 py-1"
            value={sdate}
            onChange={(e) => {
              setSdate(FormatDate(e.target.value));
              console.log(FormatDate(e.target.value));
            }}
          />
        </label>
        <label className="flex flex-col gap-1">
          End Date
          <input
            type="date"
            className="outline-1 outline rounded-[5px] px-2 py-1"
            value={edate}
            onChange={(e) => {
              setEdate(FormatDate(e.target.value));
              console.log(FormatDate(e.target.value));
            }}
          />
        </label>
        <label className="flex flex-col gap-1">
          City
          <input
            type="text"
            className="outline-1 outline rounded-[5px] px-2 py-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button className="bg-green-400 rounded-[5px]" type="submit">
          Set Input
        </button>
      </form>

      <div className="mt-10 relative p-5 rounded-[10px]">
        {loading && (
          <div className="absolute z-[1] w-full h-full bg-black/20 backdrop-blur-[8px] rounded-[10px] grid place-items-center">
            <p className="text-[28px] font-semibold animate-pulse">
              Loading...
            </p>
          </div>
        )}
        <LineChart width={1000} height={500} data={data}>
          <XAxis dataKey="jamcuaca" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="iqa" stroke="#8884d8" />
          <Line type="monotone" dataKey="tempc" stroke="#82ca9d" />
          <Line type="monotone" dataKey="humidity" stroke="#DAA520" />
          {/* <Line type="monotone" dataKey="pressure_mbar" stroke="#82ca9d" /> */}
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
