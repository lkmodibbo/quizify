import Select from "react-select";

export default function SelectDropdown({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder = "Select an option",
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: touched && error ? "red" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
      "&:hover": { borderColor: "#007bff" },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#e9f5ff"
        : "#fff",
      color: state.isSelected ? "#fff" : "black",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name,
        value: selectedOption ? String(selectedOption.value) : "",
      },
    });
  };

  const handleMenuOpen = () => {
    document.body.classList.add("select-open");
  };
  const handleMenuClose = () => {
    document.body.classList.remove("select-open");
  };

  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || null;

  // ✅ FIX: prevent "Select undefined"
  const computedPlaceholder = label
    ? `Select ${label}`
    : placeholder || "Select an option";

  return (
    <div className="select-dropdown">
      {label && <label>{label}</label>}
      <Select
        name={name}
        value={selectedOption}
        onChange={handleChange}
        onBlur={(e) => {
          if (!document.body.classList.contains("select-open")) {
            onBlur(e);
          }
        }}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        options={options}
        styles={customStyles}
        placeholder={computedPlaceholder}
      />
      {touched && error && <div className="error">{error}</div>}
    </div>
  );
}
