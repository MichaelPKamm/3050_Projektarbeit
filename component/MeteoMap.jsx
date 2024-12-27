import { renderToString } from "react-dom/server";
import {
  CssBaseline,
  Link,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import Header from "./Header";
import { BASE_LAYERS } from "./baseLayers";
import meteodata from "./data/meteodaten_2023_daily.json";
import dayjs from "dayjs";
import { Vega } from "react-vega";
import { createRoot } from "react-dom/client";

//Maximalansicht definiert durch Schweizer Landesgrenzen
const OUTER_BOUNDS = [
  [45.398181, 5.140242],
  [48.230651, 11.47757],
];

//Helper Funktion für Popups auf der Karte mit rendering der Grafik
const fetchChartSpec = async (location) => {
  const response = await fetch(`/api/py/${location}`);
  return response.json();
};

const onEachFeature = (feature, layer) => {
  const { Standort, Datum, T_max_h1, WGS84_lat, WGS84_lng } =
    feature.properties;

  const PopupContent = () => {
    const [chartSpec, setChartSpec] = useState(null);

    useEffect(() => {
      fetchChartSpec(Standort).then((spec) => setChartSpec(spec));
    }, [Standort]);

    return (
      <Box sx={{ width: "100%", height: "auto" }}>
        <Typography variant="h6">{Standort}</Typography>
        <Typography variant="body2">
          <strong>Datum:</strong> {new Date(Datum).toLocaleDateString("de-DE")}
          <br />
          <strong>Max. Temperatur:</strong> {T_max_h1}°C
          <br />
          <strong>Koordinaten:</strong> Lat: {WGS84_lat}, Lng: {WGS84_lng}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {chartSpec ? (
            <Vega spec={chartSpec} />
          ) : (
            <CircularProgress size={24} />
          )}
        </Box>
      </Box>
    );
  };

  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(<PopupContent />);
  layer.bindPopup(container);
};

//Darstellung der Punkte
const pointToLayer = (feature, latlng) => {
  console.log("Feature:", feature);
  console.log("LatLng:", latlng);
  return L.circleMarker(latlng, {
    radius: 10,
    color: "#eb3492",
    fillOpacity: 0.7,
  });
};

//
//Map Funktion, welche die Karte darstellt
//
function Map() {
  //Hooks für Datenauswahl
  const defaultDateMillis = Math.min(...meteodata.map((e) => e.Datum));
  const defaultDate = dayjs(defaultDateMillis);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [filteredData, setFilteredData] = useState([]);

  //Auswahl Daten basierend auf Eingabe Datum
  useEffect(() => {
    if (selectedDate) {
      const datumInMillis = selectedDate.valueOf();
      const filtered = meteodata.filter((e) => e.Datum === datumInMillis);
      setFilteredData(filtered);
    } else {
      setFilteredData(meteodata);
    }
  }, [selectedDate]);

  //Meteodaten einlesen
  const geoJsonData = {
    type: "FeatureCollection",
    features: filteredData.map((item) => ({
      type: "Feature",
      properties: {
        Standort: item.Standort,
        Datum: item.Datum,
        T_max_h1: item.T_max_h1,
        WGS84_lat: item.WGS84_lat,
        WGS84_lng: item.WGS84_lng,
      },
      geometry: {
        type: "Point",
        coordinates: [item.WGS84_lng, item.WGS84_lat],
      },
    })),
  };

  return (
    <>
      <CssBaseline />
      {/* Header Komponente welche Variablen erhält */}
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <MapContainer
        style={{ height: "100vh" }}
        center={[47.3769, 8.5417]}
        zoom={12}
        minZoom={8}
        maxBounds={OUTER_BOUNDS}
        maxBoundsViscosity={1}
      >
        <LayersControl position="topright">
          {BASE_LAYERS.map((baseLayer) => (
            <LayersControl.BaseLayer
              key={baseLayer.url}
              checked={baseLayer.checked}
              name={baseLayer.name}
            >
              <TileLayer
                attribution={baseLayer.attribution}
                url={baseLayer.url}
              />
            </LayersControl.BaseLayer>
          ))}

          <LayersControl.Overlay checked name="Meteodaten Zuerich">
            {console.log("GeoJSON Data being passed:", geoJsonData)}
            <GeoJSON
              key={JSON.stringify(geoJsonData)}
              data={geoJsonData}
              pointToLayer={pointToLayer}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
}

export default Map;
