import { gridCellTypeEnum } from "@survey/types/questionTypeEnum";

import Text from "./Text";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";
import Blanks from "./Blanks";
import Radio from "./Radio";

const CellWrapper = (props) => {
  const { cells, rowName, column, cellPath, cellEditor } = props;
  const { id: columnName, originalColumn } = column;
  const cellInfo = cells?.[rowName]?.[columnName] || {};
  const cellConfig = { ...originalColumn, ...cellInfo };
  const isInherit = !cellInfo?.cellType;
  const type = cellConfig.cellType;
  const CompProps = {
    cellPath,
    column,
    rowName,
    cellEditor,
    cellConfig,
    isInherit,
  };

  switch (type) {
    case gridCellTypeEnum.text:
      return <Text {...CompProps} />;
    case gridCellTypeEnum.input:
      return <Input {...CompProps} />;
    case gridCellTypeEnum.dropdown:
      return <Dropdown {...CompProps} />;
    case gridCellTypeEnum.checkbox:
      return <Checkbox {...CompProps} />;
    case gridCellTypeEnum.radio:
      return <Radio {...CompProps} />;
    case gridCellTypeEnum.blanks:
      return <Blanks {...CompProps} />;
    default:
      return <div>unkown type</div>;
  }
};

CellWrapper.props = {
  cellPath: {
    type: String,
    required: true,
  },
  column: {
    type: Object,
    required: true,
  },
  rowName: {
    type: String,
  },
  cells: {
    type: Object,
  },
  cellEditor: {
    type: Object,
  },
};

export default CellWrapper;
