import Select from "react-select";
import styles from "../filter.module.css"

export default function FiltersSelect({ options, value, onChange, placeholder, isDisabled, instanceId }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#ffffff",
      borderColor: state.isFocused ? "#962330" : "#021f54", 
      boxShadow: "none", 
      "&:hover": {
        borderColor: "#962330", 
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#962330"
        : state.isFocused
          ? "#f4d3d6"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000000",
      "&:hover": {
        backgroundColor: "#f4d3d6",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#962330",
      fontWeight: "bold",
    }),
  };

  return (
    <Select
      className={styles.filter}
      instanceId={instanceId}
      styles={customStyles}
      isClearable
      options={options || []}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
    />

  );
}
