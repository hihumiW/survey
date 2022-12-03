import Vertical from "../Layout/Vertical";
import ItemRow, { ItemRowEventProps } from "./ItemRow";
import { NButton, NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";

const ItemEditor = (props) => {
  const buttonSlot = {
    icon: () => (
      <NIcon size="20px">
        <AddCircleOutline />
      </NIcon>
    ),
  };

  const slot = {
    title: () => (
      <div class="flex justify-between">
        <span>{props.title}</span>
        {props.onItemAdd && (
          <NButton
            circle
            quaternary
            size="small"
            v-slots={buttonSlot}
            onClick={() => props.onItemAdd()}
          />
        )}
      </div>
    ),
    default: () => (
      <div class="border-neutral-200 border bg-white">
        {props.items.map((item, index) => (
          <ItemRow
            item={item}
            itemIndex={index}
            onItemTitleChange={props.onItemTitleChange}
            onItemValueChange={props.onItemValueChange}
            onItemRemove={props.onItemRemove}
          />
        ))}
      </div>
    ),
  };

  return <Vertical v-slots={slot} />;
};

ItemEditor.props = {
  title: {
    type: String,
    required: true,
  },
  bindName: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  onItemAdd: {
    type: Function,
  },
  ...ItemRowEventProps,
};

export default ItemEditor;
