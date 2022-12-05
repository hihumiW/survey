import { NIcon, NButton } from "naive-ui";
import { EllipsisVertical, RemoveCircleOutline } from "@vicons/ionicons5";

const ItemLayout = (props, { slots }) => {
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
      {slots.default()}
      {props.onRemoveClick && (
        <NButton
          text
          class="p-3"
          onClick={props.onRemoveClick}
          v-slots={buttonSlot}
        />
      )}
    </div>
  );
};

export default ItemLayout;
ItemLayout.props = {
  onRemoveClick: {
    type: Function,
  },
};
