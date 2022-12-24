import { nextTick } from "vue";
import ItemLayout from "./Layout/ItemLayout";

const ItemRow = (props) => {
  const handleValueInputBlur = (e) => {
    if (!props.onItemValueChange) return;
    const val = e.target.value;
    props.onItemValueChange(props.itemIndex, val);
    nextTick(() => {
      e.target.value = props.item.value;
    });
  };

  // 受控input
  const handleTextChange = (e) => {
    if (!props.onItemTitleChange) return;
    const val = e.target.value;
    props.onItemTitleChange(props.itemIndex, val);
    nextTick(() => {
      e.target.value = props.item.text;
    });
  };

  const handleItemRemove = () =>
    props.onItemRemove
      ? props.onItemRemove(props.itemIndex, props.item)
      : undefined;
  const handleEditClick = props.onEditClick
    ? () => props.onEditClick(props.itemIndex, props.item)
    : undefined;

  return (
    <ItemLayout
      onRemoveClick={handleItemRemove}
      onEditClick={handleEditClick}
      onItemMove={props.onItemMove}
    >
      <input
        class="survey-sideBar-itemRow_input textbase"
        placeholder="Choice value"
        value={props.item.value}
        onBlur={handleValueInputBlur}
      />
      <input
        class="survey-sideBar-itemRow_input"
        placeholder="Choice text"
        value={props.item.text}
        onInput={handleTextChange}
      />
    </ItemLayout>
  );
};

export const ItemRowEventProps = {
  onItemTitleChange: {
    type: Function,
  },
  onItemValueChange: {
    type: Function,
  },
  onItemRemove: {
    type: Function,
  },
  onEditClick: {
    type: Function,
  },
  onItemMove: {
    type: Function,
  },
};

ItemRow.props = {
  item: {
    type: Object,
    required: true,
  },
  itemIndex: {
    type: Number,
    required: true,
  },
  ...ItemRowEventProps,
};

export default ItemRow;
