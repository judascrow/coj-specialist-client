import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllDistricts } from "../requests/Address";

const DistrictSelectOptions = ({
  onChange,
  value,
  placeholder,
  reactSelectID,
  isClearable,
  provinceID,
  ...other
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadDistrictsData(provinceID);
    // eslint-disable-next-line
  }, [provinceID]);

  const loadDistrictsData = async (provinceID) => {
    if (provinceID !== "" && provinceID !== undefined && provinceID != null) {
      const result = await getAllDistricts(provinceID);

      if (result && result.data.data !== undefined) {
        const options = result.data.data.map((b) => {
          return {
            value: b.id,
            label: b.nameTH,
          };
        });

        setOptions(options);
      }
    } else {
      setOptions([]);
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

export default DistrictSelectOptions;
