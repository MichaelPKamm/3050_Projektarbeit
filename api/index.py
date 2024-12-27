from fastapi import FastAPI
import json
import os
from datetime import datetime

app = FastAPI()


data_file_path = "/meteodaten_2023_daily.json"

with open(data_file_path, "r", encoding="utf-8") as f:
    data = json.load(f)


#Grafik aus VegaLite Templates
@app.get("/api/py/{location}")
def get_chart(location: str):
    
    filtered_data = [
        {"date": datetime.fromtimestamp(entry["Datum"] / 1000).strftime("%Y-%m-%d"), 
         "temperature": entry["T_max_h1"]}
        for entry in data if entry["Standort"] == location
    ]

    return {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": f"Scatterplot für {location}",
        "width": 800,
        "height": 500,
        "padding": 5,
        "config": {
            "axis": {
                "domain": False,
                "labelFontSize": 12,
                "labelFontWeight": "bold",
                "tickSize": 0,
            }
        },
        "data": [{"name": "drive", "values": filtered_data}],
        "scales": [
            {
                "name": "x",
                "type": "linear",
                "domain": {"data": "drive", "field": "date"},
                "range": "width",
                "nice": True,
                "zero": False,
                "round": True,
            },
            {
                "name": "y",
                "type": "linear",
                "domain": {"data": "drive", "field": "temperature"},
                "range": "height",
                "nice": True,
                "zero": False,
                "round": True,
            },
        ],
        "axes": [
            {"orient": "top", "scale": "x", "tickCount": 5, "grid": True},
            {"orient": "bottom", "scale": "x", "title": "Date", "ticks": False, "labels": False},
            {"orient": "left", "scale": "y", "tickCount": 5, "grid": True, "format": "0.2f"},
            {"orient": "right", "scale": "y", "title": "Temperature (°C)", "ticks": False, "labels": False},
        ],
        "marks": [
            {
                "type": "line",
                "from": {"data": "drive"},
                "encode": {
                    "enter": {
                        "interpolate": {"value": "cardinal"},
                        "x": {"scale": "x", "field": "date"},
                        "y": {"scale": "y", "field": "temperature"},
                        "stroke": {"value": "#000"},
                        "strokeWidth": {"value": 3},
                    }
                },
            },
            {
                "type": "symbol",
                "from": {"data": "drive"},
                "encode": {
                    "enter": {
                        "x": {"scale": "x", "field": "date"},
                        "y": {"scale": "y", "field": "temperature"},
                        "fill": {"value": "#fff"},
                        "stroke": {"value": "#000"},
                        "strokeWidth": {"value": 1},
                        "size": {"value": 49},
                    }
                },
            },
        ],
    }