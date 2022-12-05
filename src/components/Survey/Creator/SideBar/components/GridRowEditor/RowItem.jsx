import ItemLayout from "../ItemsEditor/Layout/ItemLayout";

const RowItem = (props) => {
  const handleRemoveClick = () => {};

  return (
    <ItemLayout onRemoveClick={handleRemoveClick}>
      <input
        type="text"
        class="survey-sideBar-itemRow_input"
        value={props.rowValue}
      />
    </ItemLayout>
  );
};

RowItem.props = {
  rowValue: {
    type: String,
    required: true,
  },
  rowIndex: {
    type: Number,
    required: true,
  },
};

export default RowItem;
