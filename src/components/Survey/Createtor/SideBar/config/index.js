import textConfig from "./textConfig";
import SelectConfig from "./selectConfig";
import fileConfig from "./fileConfig";
import panelConfig from "./panelConfig";

const sideBarConfig = {
  text: textConfig,
  radiogroup: SelectConfig,
  checkbox: SelectConfig,
  dropdown: SelectConfig,
  file: fileConfig,
  panel: panelConfig,
};

export default sideBarConfig;
