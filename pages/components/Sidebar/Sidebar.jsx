'use client';

import { listItems } from "./data";
import {
  ListItem,
  SidebarContainer,
  SidebarContent,
  SidebarHeader,
} from "./Sidebar.styled";

export const Sidebar = ({ mapView, handleMapViewChange }) => {
  return (
    <SidebarContainer>
      <SidebarHeader>Mapa de Asambleas</SidebarHeader>
      <SidebarContent>
        <ul>
          {listItems.map((item) => (
            <ListItem
              key={item.key}
              isActive={item.key === mapView}
              onClick={() => {
                handleMapViewChange(item.key);
              }}
            >
              {item.value}
            </ListItem>
          ))}
        </ul>
      </SidebarContent>
    </SidebarContainer>
  );
};