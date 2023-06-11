import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";

export default function FormSection() {
    return (
        <>
            <Box sx={{ width: "550px", margin: "0 auto" }}>
                <RadioGroup sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} defaultValue="flight-type">
                    <FormControlLabel value="oneway" control={<Radio />} label="One Way" />
                    <FormControlLabel value="roundtrip" control={<Radio />} label="Round Trip" />
                    <FormControlLabel value="multicity" control={<Radio />} label="Multi-City" />
                </RadioGroup>
            </Box>
            <TextField id="from-inp" label="From" variant="outlined" />
            <TextField id="to-inp" label="To" variant="outlined" />
            <TextField id="number-passengers" label="Passengers" variant="outlined" />
            <Box sx={{ width: "80%", margin: "0 auto" }}>
                <RadioGroup sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} defaultValue="fam-type">
                    <FormControlLabel value="armed" control={<Radio />} label="Armed Forces" />
                    <FormControlLabel value="vaccinated" control={<Radio />} label="Vaccinated" />
                    <FormControlLabel value="fam-friends" control={<Radio />} label="Family and Friends" />
                    <FormControlLabel value="students" control={<Radio />} label="Students" />
                    <FormControlLabel value="doctors" control={<Radio />} label="Doctors and Nurses" />
                </RadioGroup>
            </Box>
            <Button variant="outlined">Search Flights</Button>
        </>
    );
}
