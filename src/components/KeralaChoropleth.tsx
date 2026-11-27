"use client";
import { useEffect, useState } from "react";
import { geoJSON } from "leaflet";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import { heatColor, RAG_HEX } from "@/lib/ui";
import { districtByName } from "@/data/districts";

interface Props {
  values: Record<string, number>; // keyed by district name or geoName
  height?: number;
  onSelect?: (district: string) => void;
  ragMode?: boolean; // if values are 0..100 governance -> rag heat reversed
  unit?: string;
  fitDistricts?: boolean;
  colorScale?: (fraction: number) => string;
  formatValue?: (value: number) => string;
  selectedDistrict?: string;
}

function FitDistrictBounds({ data }: { data: FeatureCollection }) {
  const map = useMap();

  useEffect(() => {
    const bounds = geoJSON(data).getBounds();
    const container = map.getContainer();
    const fit = () => {
      if (bounds.isValid() && container.clientWidth && container.clientHeight) {
        map.invalidateSize({ pan: false });
        map.fitBounds(bounds, { padding: [14, 14], animate: false });
      }
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [data, map]);

  return null;
}

export default function KeralaChoropleth({ values, height = 360, onSelect, unit = "", fitDistricts, colorScale = heatColor, formatValue, selectedDistrict }: Props) {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/kerala.geojson").then((r) => r.json()).then(setGeo).catch(() => {});
  }, []);

  // resolve a value for each geo feature name
  const resolve = (geoName: string): number | undefined => {
    if (values[geoName] != null) return values[geoName];
    const d = districtByName(geoName);
    if (d && values[d.name] != null) return values[d.name];
    return undefined;
  };

  const nums = Object.values(values).filter((v) => typeof v === "number");
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  const styleFn = (feature?: Feature) => {
    const name = feature?.properties?.District as string;
    const v = resolve(name);
    if (v == null) return { fillColor: "#e7ecf6", weight: 1, color: "#fff", fillOpacity: 0.85 };
    const t = max === min ? 0.6 : (v - min) / (max - min);
    const selected = !!selectedDistrict && districtByName(name)?.name === selectedDistrict;
    return { fillColor: colorScale(t), weight: selected ? 2.6 : 1.2, color: selected ? "#172956" : "#ffffff", fillOpacity: 0.92 };
  };

  const onEach = (feature: Feature, layer: any) => {
    const name = feature.properties?.District as string;
    const v = resolve(name);
    const d = districtByName(name);
    const valueLabel = v == null ? "—" : formatValue?.(v) ?? `${v} ${unit}`;
    const tooltip = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = d?.name || name;
    const value = document.createElement("div");
    value.textContent = valueLabel;
    tooltip.append(title, value);
    layer.bindTooltip(
      tooltip,
      { sticky: true, direction: "top", className: "kl-tip" }
    );
    layer.on({
      mouseover: () => layer.setStyle({ weight: 2.4, color: RAG_HEX.blue, fillOpacity: 1 }),
      mouseout: () => layer.setStyle(styleFn(feature)),
      click: () => onSelect && d && onSelect(d.name),
    });
  };

  return (
    <div style={{ height, position: "relative", zIndex: 0, isolation: "isolate" }} className="kl-map-wrap overflow-hidden rounded-xl">
      {geo && (
        <MapContainer
          center={[10.4, 76.2]}
          zoom={7}
          zoomSnap={fitDistricts ? 0.1 : 1}
          style={{ height: "100%", width: "100%", background: "transparent" }}
          zoomControl={false}
          attributionControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          touchZoom={false}
        >
          {fitDistricts && <FitDistrictBounds data={geo} />}
          <GeoJSON key={JSON.stringify([values, selectedDistrict])} data={geo} style={styleFn} onEachFeature={onEach}
            filter={fitDistricts ? (feature) => typeof feature.properties?.District === "string" && !!districtByName(feature.properties.District) : undefined} />
        </MapContainer>
      )}
    </div>
  );
}
