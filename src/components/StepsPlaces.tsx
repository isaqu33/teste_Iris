"use client";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Data, Country, State, City } from "@/types";
import ModalCityResult from "./ModalCityResult";

export default function StepsPlaces({ data }: { data: Data[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const steps = [
    {
      label: "Select Country",
      content: (
        <Select
          value={selectedCountry?.code || ""}
          onChange={(e) => {
            const country = data.find(
              (country) => country.code === e.target.value
            );

            setSelectedCountry(country || null);
            setSelectedState(null);
            setSelectedCity(null);
          }}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">
            <em>Select a country</em>
          </MenuItem>
          {data.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      label: "Select State",
      content: (
        <Select
          value={selectedState?.code || ""}
          onChange={(e) => {
            const state = selectedCountry?.states.find(
              (state) => state.code === e.target.value
            );
            setSelectedState(state || null);
            setSelectedCity(null);
          }}
          displayEmpty
          fullWidth
          disabled={!selectedCountry}
        >
          <MenuItem value="">
            <em>Select a state</em>
          </MenuItem>
          {selectedCountry?.states.map((state) => (
            <MenuItem key={state.code} value={state.code}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      label: "Select City",
      content: (
        <Select
          value={selectedCity?.code || ""}
          onChange={(e) => {
            const city = selectedState?.cities.find(
              (city) => city.code === e.target.value
            );
            setSelectedCity(city || null);
          }}
          displayEmpty
          fullWidth
          disabled={!selectedState}
        >
          <MenuItem value="">
            <em>Select a city</em>
          </MenuItem>
          {selectedState?.cities.map((city) => (
            <MenuItem key={city.code} value={city.code}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box>{step.content}</Box>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={
                    (index === 0 && !selectedCountry) ||
                    (index === 1 && !selectedState) ||
                    (index === 2 && !selectedCity)
                  }
                >
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box sx={{ p: 3 }}>
          <Typography>All steps completed - youre finished</Typography>
          <ModalCityResult data={selectedCity as City}></ModalCityResult>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Box>
      )}
    </Box>
  );
}
