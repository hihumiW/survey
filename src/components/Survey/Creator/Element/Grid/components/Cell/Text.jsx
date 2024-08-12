import Title from "@survey/components/Title/index.vue";
import cellProps from "./cellProps";
import { gridCellTypeEnum } from "@survey/types/questionTypeEnum";

const Text = (props) => {
  const {
    cellPath,
    cellEditor: { updateCellText },
    isInherit,
    cellConfig,
  } = props;
  const { textAlign = "left", cellAlias, cellType } = cellConfig;
  if (cellType === gridCellTypeEnum.valueText) {
    return (
      <div className="text-orange-400 break-all italic">
        ** (文本)内容通过值加载（加载字段名：{cellAlias}) **
      </div>
    );
  }
  return (
    <div className="p-2" style={{ textAlign }}>
      <Title
        value={cellConfig.cellText}
        placeholder={isInherit ? "" : "请输入文本"}
        editable={!isInherit}
        onUpdate:value={(text) => updateCellText(cellPath, text)}
      />
    </div>
  );
};

Text.props = cellProps;
export default Text;
