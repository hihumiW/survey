import questionTypeEnum from "@survey/util/questionTypeEnum";
import textConfig from "./textConfig";
import SelectConfig from "./selectConfig";
import fileConfig from "./fileConfig";
import panelConfig from "./panelConfig";
import matrixConfig from "./matrixConfig";
import gridConfig from "./gridConfig";

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
  [questionTypeEnum.grid]: gridConfig,
};

export default sideBarConfig;
