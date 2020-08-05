import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllProvices } from "../requests/Address";

const ProvinceSelectOptions = ({
  onChange,
  value,
  placeholder,
  reactSelectID,
  isClearable,
  ...other
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadProvicesData();
    // eslint-disable-next-line
  }, []);

  const loadProvicesData = async () => {
    const result = await getAllProvices();

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

export default ProvinceSelectOptions;
