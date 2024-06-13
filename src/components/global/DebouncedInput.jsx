import * as React from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Search from "@mui/icons-material/Search";
function DebounceInput(props) {
  const { handleSearch, debounceTimeout, ...rest } = props;

  const timerRef = React.useRef();

  const handleChange = (event) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleSearch(event.target.value);
    }, debounceTimeout);
  };

  return (
    <Input startDecorator={<Search />} {...rest} onChange={handleChange} />
  );
}

export default function DebouncedInput({ handleSearch, placeholder }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <DebounceInput
        placeholder={placeholder}
        debounceTimeout={1000}
        handleSearch={handleSearch}
      />
    </Box>
  );
}
