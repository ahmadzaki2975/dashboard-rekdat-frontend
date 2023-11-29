export default function CustomTooltip({ active, payload, label }: any) {
  function MapIQA(iqa: number) {
    if (iqa <= 50) {
      return "Baik";
    } else if (iqa <= 100) {
      return "Sedang";
    } else if (iqa <= 150) {
      return "Tidak Sehat Bagi Orang Sensitif";
    } else if (iqa <= 200) {
      return "Tidak Sehat";
    } else if (iqa <= 300) {
      return "Sangat Tidak Sehat";
    } else if (iqa > 301) {
      return "Berbahaya";
    }
  }
  function MapIQABG(iqa: number) {
    if (iqa <= 50) {
      return "bg-[#82ca9d]";
    } else if (iqa <= 100) {
      return "bg-[#DAA520]";
    } else if (iqa <= 150) {
      return "bg-[#ff8c00]";
    } else if (iqa <= 200) {
      return "bg-[#ff0000]";
    } else if (iqa <= 300) {
      return "bg-[#800080]";
    } else if (iqa > 301) {
      return "bg-[#7e0023]";
    }
  }
  function MapIQAText(iqa: number) {
    if (iqa <= 50) {
      return "text-[#82ca9d]";
    } else if (iqa <= 100) {
      return "text-[#DAA520]";
    } else if (iqa <= 150) {
      return "text-[#ff8c00]";
    } else if (iqa <= 200) {
      return "text-[#ff0000]";
    } else if (iqa <= 300) {
      return "text-[#800080]";
    } else if (iqa > 301) {
      return "text-[#7e0023]";
    }
  }
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    // console.log(dataPoint);
    return (
      <div className="bg-white p-5 outline outline-1 rounded-[5px]">
        <p className="font-bold">{dataPoint.kota}</p>
        <p className="font-semibold">{`${label}`}</p>
        <p>
          Cuaca: <span className="font-semibold">{dataPoint.cuaca}</span>
        </p>
        <p className="">
          AQI: <span className="text-[#8884d8] font-bold">{dataPoint.iqa}</span>
        </p>
        <div className="flex items-center gap-1">
          <span
            className={
              "inline-block w-[15px] aspect-square rounded-full " +
              MapIQABG(dataPoint.iqa)
            }
          ></span>
          <span className={"text-semibold " + (MapIQAText(dataPoint.iqa))}>{MapIQA(dataPoint.iqa)}</span>
        </div>
        <p className="">
          Suhu:{" "}
          <span className="text-[#82ca9d] font-bold">{dataPoint.tempc}</span>
        </p>
        <p className="">
          Humidity:{" "}
          <span className="text-[#DAA520] font-bold">{dataPoint.humidity}</span>
        </p>
        {/* <p className="font-semibold">{`Pressure: ${dataPoint.pressure_mbar}`}</p> */}
      </div>
    );
  }

  return null;
}
