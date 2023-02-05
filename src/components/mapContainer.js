import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { PolygonLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";

const MapContainer = ({ geoJSON }) => {
  const [viewState, setViewState] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11,
    pitch: 0,
    bearing: 0,
  });

  const layers = [
    new PolygonLayer({
      id: "polygon-layer",
      data: geoJSON,
      getPolygon: (f) => f.geometry.coordinates,
      getFillColor: [255, 0, 0, 128],
    }),
  ];
  const mapContainer = useRef(null);

  useEffect(() => {
    console.log("Received geoJSON: ", geoJSON);
    mapboxgl.accessToken = "MY_API";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      pitch: viewState.pitch,
      bearing: viewState.bearing,
    });

    map.on("moveend", () => {
      setViewState({
        longitude: map.getCenter().lng,
        latitude: map.getCenter().lat,
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
      });
    });

    return () => map.remove();
  }, [viewState]);

  return (
    <>
      <div ref={mapContainer} style={{ height: "100vh", width: "100%" }} />
      <DeckGL
        initialViewState={viewState}
        layers={layers}
        controller={true}
        onWebGLInitialized={(gl) => {
          mapboxgl.accessToken = "MY_API";
          const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-74.5, 40],
            zoom: 10,
          });
        }}
      />
    </>
  );
};

export default MapContainer;
