import { gridCellTypeEnum } from "@survey/util/questionTypeEnum";

import Text from "./Text";
import Input from "./Input";
import Dropdown from "./Dropdown";

const CellWrapper = (props) => {
  const { cells, rowName, column, cellPath, cellEditor } = props;
  const { id: columnName, originalColumn } = column;
  const cellInfo = cells?.[rowName]?.[columnName];
  const cellConfig = cellInfo || originalColumn;
  const isInherit = !cellInfo;
  const type = cellConfig?.cellType;
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
