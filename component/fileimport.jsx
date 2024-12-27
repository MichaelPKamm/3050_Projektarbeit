import data from "./data/meteodaten_2023_daily.json";

function Daten() {
  //Datenaufbereitung
  const standort = data.map((element) => element.Standort).sort();
  const datum = data
    .map((element) => new Date(element.Datum).toLocaleDateString("de-DE"))
    .sort();
  const koordinaten = data.map((element) => ({
    standort: element.Standort,
    lat: element.WGS84_lat,
    lng: element.WGS84_lng,
  }));

  console.log("Standorte:", standorte);
  console.log("Daten:", daten);
  console.log("Koordinaten:", koordinaten);

  return null;
}

export default Daten;
