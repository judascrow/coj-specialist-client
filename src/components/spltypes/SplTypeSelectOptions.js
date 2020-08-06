import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllSplTypes } from "../requests/SplTypes";

const SplTypeSelectOptions = ({
  onChange,
  value,
  placeholder,
  reactSelectID,
  isClearable,
  ...other
}) => {
  const [options, setOptions] = useState([]);
  if (value?.value) {
    value = value.value;
  }
  useEffect(() => {
    loadProvicesData();
    // eslint-disable-next-line
  }, []);

  const loadProvicesData = async () => {
    const result = await getAllSplTypes();

    if (result && result.data.data !== undefined) {
      const options = result.data.data.map((b) => {
        return {
          value: b.id,
          label: b.nameTH,
        };
      });

      setOptions(options);
    }
  };

  return (
    <div>
      <Select
        options={options}
        onChange={onChange}
        value={options.find((s) => s.value === value)}
        placeholder={placeholder}
        reactSelectID={reactSelectID}
        isClearable={true}
        {...other}
      />
    </div>
  );
};

export default SplTypeSelectOptions;
