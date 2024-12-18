import React from "react";

// Define your base layers array
const BaseLayers = () => {
  const layers = [
    {
      name: "Esri World Imagery",
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      checked: true,
    },
    {
      name: "Esri World Terrain",
      attribution:
        "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
    },
  ];

  if (!layers || layers.length === 0) {
    return <div>No base layers available.</div>;
  }

  return (
    <div>
      <h1>Base Layers</h1>
      <ul>
        {layers.map((layer, index) => (
          <li key={index}>
            <h2>{layer.name}</h2>
            <p>{layer.attribution}</p>
            <p>
              URL:{" "}
              <a href={layer.url} target="_blank" rel="noopener noreferrer">
                {layer.url}
              </a>
            </p>
            <p>{layer.checked ? "Checked" : "Unchecked"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseLayers;
