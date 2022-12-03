import questionTypeEnum from "@survey/util/questionTypeEnum";
import textConfig from "./textConfig";
import SelectConfig from "./selectConfig";
import fileConfig from "./fileConfig";
import panelConfig from "./panelConfig";
import matrixConfig from "./matrixConfig";

const sideBarConfig = {
  [questionTypeEnum.text]: textConfig,
  [questionTypeEnum.radiogroup]: SelectConfig,
  [questionTypeEnum.checkbox]: SelectConfig,
  [questionTypeEnum.dropdown]: SelectConfig,
  [questionTypeEnum.file]: fileConfig,
  [questionTypeEnum.panel]: panelConfig,
  [questionTypeEnum.matrixradio]: matrixConfig,
  [questionTypeEnum.matrixcheckbox]: matrixConfig,
  [questionTypeEnum.matrixinput]: matrixConfig,
};

export default sideBarConfig;
