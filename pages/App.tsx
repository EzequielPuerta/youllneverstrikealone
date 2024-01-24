'use client';

import { useLoadScript } from "@react-google-maps/api";
import Dashboard from "./components/Dashboard";

const App = () => {  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ["drawing"],
  });

  return <div>{!isLoaded ? <h1>Loading...</h1> : <Dashboard />}</div>;
};

export default App;