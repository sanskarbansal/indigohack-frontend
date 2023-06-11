function Form() {
  return (
    <>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="oneway"
            control={<Radio />}
            label="One Way"
          />
          <FormControlLabel
            value="roundtrip"
            control={<Radio />}
            label="Round Trip"
          />
          <FormControlLabel
            value="multicity"
            control={<Radio />}
            label="Multi-City"
          />
        </RadioGroup>
      </FormControl>
      <TextField id="from-inp" label="From" variant="outlined" />
      <TextField id="to-inp" label="To" variant="outlined" />
    </>
  );
}
