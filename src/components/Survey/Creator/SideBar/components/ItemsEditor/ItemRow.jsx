import { NIcon, NButton } from "naive-ui";
import { EllipsisVertical, RemoveCircleOutline } from "@vicons/ionicons5";
import { nextTick } from "vue";
import "./ItemRow.css";
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

  const handleItemRemove = () => props.onItemRemove(props.itemIndex);

  const buttonSlot = {
    icon: () => (
      <NIcon size="20px">
        <RemoveCircleOutline />
      </NIcon>
    ),
  };

  return (
    <div class="flex items-center">
      <div class="p-3 flex items-center cursor-move">
        <NIcon size="20px" color="#909090">
          <EllipsisVertical />
        </NIcon>
      </div>
      <input
        class="survey-sideBar-itemRow_input textbase"
        placeholder="Choice value"
        value={props.item.value}
        onBlur={handleValueInputBlur}
      />
      <input
        class="survey-sideBar-itemRow_input"
        placeholder="Choive text"
        value={props.item.text}
        onInput={handleTextChange}
      />
      {props.onItemRemove && (
        <NButton
          text
          class="p-3"
          onClick={handleItemRemove}
          v-slots={buttonSlot}
        />
      )}
    </div>
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
