export default function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    // console.log(dataPoint);
    return (
      <div className="bg-white p-5 outline outline-1 rounded-[5px]">
        <p className="font-bold">{dataPoint.kota}</p>
        <p className="font-semibold">{`${label}`}</p>
        <p>Cuaca: <span className="font-semibold">{dataPoint.cuaca}</span></p>
        <p className="">AQI: <span className="text-[#8884d8] font-bold">{dataPoint.iqa}</span></p>
        <p className="">Suhu: <span className="text-[#82ca9d] font-bold">{dataPoint.tempc}</span></p>
        <p className="">Humidity: <span className="text-[#DAA520] font-bold">{dataPoint.humidity}</span></p>
        {/* <p className="font-semibold">{`Pressure: ${dataPoint.pressure_mbar}`}</p> */}
      </div>
    );
  }

  return null;
}