import Vertical from "../../Layout/Vertical";
import { NButton, NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";

const ItemEditor = (props, { slots }) => {
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
      <div class="border-neutral-200 border bg-white dark:bg-neutral-700 dark:border-neutral-800">
        {slots.default()}
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
  onItemAdd: {
    type: Function,
  },
};

export default ItemEditor;
