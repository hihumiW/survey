import QuestionTypeEnum from "@survey/util/questionTypeEnum";
import textConfig from "./textConfig";
import SelectConfig from "./selectConfig";
import fileConfig from "./fileConfig";
import panelConfig from "./panelConfig";
import { gridConfig, gridCellConfig } from "./gridConfig";
import matrixConfig, {
  matrixSelectColumnConfig,
  matrixInputColumnConfig,
  matrixDropdownColumnConfig,
} from "./matrixConfig";

const sideBarConfig = {
  [QuestionTypeEnum.text]: textConfig,
  [QuestionTypeEnum.radiogroup]: SelectConfig,
  [QuestionTypeEnum.checkbox]: SelectConfig,
  [QuestionTypeEnum.dropdown]: SelectConfig,
  [QuestionTypeEnum.file]: fileConfig,
  [QuestionTypeEnum.panel]: panelConfig,
  [QuestionTypeEnum.matrixradio]: matrixConfig,
  [QuestionTypeEnum.matrixcheckbox]: matrixConfig,
  [QuestionTypeEnum.matrixSelectColumn]: matrixSelectColumnConfig,
  [QuestionTypeEnum.matrixinput]: matrixConfig,
  [QuestionTypeEnum.matrixInputColumn]: matrixInputColumnConfig,
  [QuestionTypeEnum.matrixdropdown]: matrixConfig,
  [QuestionTypeEnum.matrixDropdownColumn]: matrixDropdownColumnConfig,
  [QuestionTypeEnum.grid]: gridConfig,
  [QuestionTypeEnum.gridColumn]: gridCellConfig,
  [QuestionTypeEnum.gridCell]: gridCellConfig,
};

export default sideBarConfig;
