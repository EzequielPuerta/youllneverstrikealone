'use client';

import { useState } from "react";
import Gatherings from "../Gatherings";
import Sidebar from "../Sidebar";
import {
  DashboardContainer,
  MapSection,
  SidebarSection,
} from "./Dashboard.styled";

export const Dashboard = () => {
  const [mapView, setMapView] = useState("gatherings");
  const handleMapViewChange = (value) => setMapView(value);

  const renderMap = (feature) => {
    switch (feature) {
      case "gatherings":
        return <Gatherings />;
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <SidebarSection>
        <Sidebar mapView={mapView} handleMapViewChange={handleMapViewChange} />
      </SidebarSection>
      <MapSection>{renderMap(mapView)}</MapSection>
    </DashboardContainer>
  );
};