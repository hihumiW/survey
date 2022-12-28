import Title from "@survey/components/Title/index.vue";
import cellProps from "./cellProps";

const Text = (props) => {
  const {
    cellPath,
    cellEditor: { updateCellText },
    isInherit,
    cellConfig,
  } = props;
  return (
    <div className="p-2">
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
