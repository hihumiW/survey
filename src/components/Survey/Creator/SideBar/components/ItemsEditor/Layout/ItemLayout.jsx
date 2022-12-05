import { NIcon, NButton } from "naive-ui";
import {
  EllipsisVertical,
  RemoveCircleOutline,
  PencilOutline,
} from "@vicons/ionicons5";

const ItemLayout = (props, { slots }) => {
  const revemoButtonSlot = {
    icon: () => (
      <NIcon size="20px">
        <RemoveCircleOutline />
      </NIcon>
    ),
  };

  const editButtonSlot = {
    icon: () => (
      <NIcon size="20px">
        <PencilOutline />
      </NIcon>
    ),
  };

  return (
    <div class="flex items-center">
      <div class="p-3 flex items-center cursor-move mr-1">
        <NIcon size="20px" color="#909090">
          <EllipsisVertical />
        </NIcon>
      </div>
      {slots.default()}
      {props.onEditClick && (
        <NButton
          text
          class="p-3 mx-1"
          onClick={props.onEditClick}
          v-slots={editButtonSlot}
        />
      )}
      {props.onRemoveClick && (
        <NButton
          text
          class="p-3 mx-1"
          onClick={props.onRemoveClick}
          v-slots={revemoButtonSlot}
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
  onEditClick: {
    type: Function,
  },
};
