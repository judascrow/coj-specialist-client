import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllSubDistricts } from "../requests/Address";

const SubDistrictSelectOptions = ({
  onChange,
  value,
  placeholder,
  reactSelectID,
  isClearable,
  provinceID,
  districtID,
  ...other
}) => {
  const [options, setOptions] = useState([]);
  if (value?.value) {
    value = value.value;
  }
  useEffect(() => {
    loadSubDistrictsData(provinceID, districtID);
    // eslint-disable-next-line
  }, [provinceID, districtID]);

  const loadSubDistrictsData = async (provinceID, districtID) => {
    if (
      provinceID !== "" &&
      districtID !== "" &&
      provinceID !== undefined &&
      districtID !== undefined &&
      provinceID !== null &&
      districtID !== null
    ) {
      const result = await getAllSubDistricts(provinceID, districtID);

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
        maxMenuHeight={200}
        {...other}
      />
    </div>
  );
};

export default SubDistrictSelectOptions;
