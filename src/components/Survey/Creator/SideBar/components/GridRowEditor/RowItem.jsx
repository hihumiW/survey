import ItemLayout from "../ItemsEditor/Layout/ItemLayout";

const RowItem = (props) => {
  const handleRemoveClick = () =>
    props.onItemRemove && props.onItemRemove(props.rowIndex, props.rowValue);

  return (
    <ItemLayout onRemoveClick={handleRemoveClick}>
      <input
        type="text"
        class="survey-sideBar-itemRow_input"
        value={props.rowValue}
        disabled
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
  onItemRemove: Function,
};

export default RowItem;
