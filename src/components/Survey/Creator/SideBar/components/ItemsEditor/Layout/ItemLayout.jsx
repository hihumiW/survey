import { NIcon, NButton } from "naive-ui";
import {
  EllipsisVertical,
  RemoveCircleOutline,
  PencilOutline,
  ArrowUp,
  ArrowDown,
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
      <NButton
        text
        class="p-3"
        onClick={() => props.onItemMove && props.onItemMove("up")}
      >
        {{
          icon: () => (
            <NIcon size="20px">
              <ArrowUp />
            </NIcon>
          ),
        }}
      </NButton>
      <NButton
        text
        class="p-3 mr-3"
        onClick={() => props.onItemMove && props.onItemMove("down")}
      >
        {{
          icon: () => (
            <NIcon size="20px">
              <ArrowDown />
            </NIcon>
          ),
        }}
      </NButton>

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
  onItemMove: {
    type: Function,
  },
};
