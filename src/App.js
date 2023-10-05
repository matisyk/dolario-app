import React from "react";
import TablaDolar from "./components/TablaDolar";
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Typography variant="h4">
        Cotizaciones del dólar por banco (aprox)
      </Typography>
      <TablaDolar />
    </div>
  );
}

export default App;
