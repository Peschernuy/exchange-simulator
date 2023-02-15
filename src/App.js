import './App.css'
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import dataInfo from './data.js'

const App = (props) => {
  const ChartComponent = (props) => {
    const {
      data,
      colors: {
        backgroundColor = "white",
        lineColor = "#2962FF",
        textColor = "black",
        areaTopColor = "#2962FF",
        areaBottomColor = "rgba(41, 98, 255, 0.28)",
      } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(() => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 555,
      });
      chart.timeScale().fitContent();

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      candlestickSeries.setData(data);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    }, [
      data,
      backgroundColor,
      lineColor,
      textColor,
      areaTopColor,
      areaBottomColor,
    ]);

    return <div ref={chartContainerRef} />;
  };

  const initialData = dataInfo.map((item) => {
    return {open: item.open, high: item.high, low: item.low, close: item.close, time: item.time}
  })
    
   
  

  return (
    <>
      <h1 className="app-title">Super Pupper Chart for Traders</h1>
      <ChartComponent {...props} data={initialData}></ChartComponent>
    </>
  );
};

export default App;
