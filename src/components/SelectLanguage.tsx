import Select, { StylesConfig } from "react-select";
import { Language } from "../interfaces/Language";

const selectStyle: StylesConfig = {
  placeholder: (base) => ({ ...base, color: "white" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "white",
    "&:hover": { color: "white" },
  }),
  singleValue: (base) => ({ ...base, color: "white" }),
  control: (base) => ({ ...base, background: "#6b6b7a", border: "none", boxShadow: "none" }),
  menuList: (base) => ({ ...base, background: "#464650" }),
  option: (base, { isFocused }) => ({
    ...base,
    background: isFocused ? "#6b6b7a" : "#464650",
  }),
};

type OnChange = (newValue: Language) => void;
export function SelectLanguage({ onChange, value, languages }: { onChange: OnChange; value: string; languages: Language[] }) {
  return (
    <Select
      value={languages.find((lang) => lang.value === value)}
      onChange={(val) => {
        onChange(val as Language);
      }}
      styles={selectStyle}
      placeholder="언어를 선택해주세요"
      options={languages}
    />
  );
}
