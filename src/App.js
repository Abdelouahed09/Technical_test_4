import React, { useRef, useState } from "react";
import MapContainer from "./components/mapContainer";
import { Grid, Input, Button, Typography, Slider } from "@mui/material";
import "./index.css";
import Stats from "./components/stats";

function App() {
  const [value, setValue] = useState(10);
  const [geojson, setGeojson] = useState(null);
  const fileInput = useRef(null);
  // const [data, setData] = useState(null);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      setGeojson(JSON.parse(evt.target.result));
    };
  };

  return (
    <div className="App">
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          lg={3}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="upload-btn">
            <input
              style={{ display: "none" }}
              type="file"
              ref={fileInput}
              onChange={handleFileInput}
            />
            {/* {geojson ? <MapContainer geoJSON={geojson} /> : null} */}
            <Button
              onClick={() => fileInput.current.click()}
              variant="contained"
              color="primary"
            >
              LOAD GEOJSON
            </Button>
          </div>

          <Typography className="input-slider" gutterBottom>
            Lot Coverage %
          </Typography>
          <Grid
            container
            spacing={2}
            className="input-range"
            alignItems="center"
          >
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
          <Typography className="input-slider" gutterBottom>
            Floor Number
          </Typography>
          <Grid
            container
            spacing={2}
            className="input-range"
            alignItems="center"
          >
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
          <Typography className="input-slider" gutterBottom>
            Floor Height
          </Typography>
          <Grid
            container
            spacing={2}
            className="input-range"
            alignItems="center"
          >
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          {geojson ? <MapContainer geoJSON={geojson} /> : null}
        </Grid>
        <Grid item xs={12} lg={2}>
          <Stats />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
