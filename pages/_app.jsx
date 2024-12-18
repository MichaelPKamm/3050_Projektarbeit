import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../component/QuakesMap"), { ssr: false });

export default function App() {
  return (
    <>
      <Map />
    </>
  );
}
