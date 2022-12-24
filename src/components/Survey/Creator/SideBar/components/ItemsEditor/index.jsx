import EditorLayout from "./Layout/EditorLayout";
import ItemRow, { ItemRowEventProps } from "./ItemRow";
import { NEmpty } from "naive-ui";

const ItemEditor = (props) => {
  return (
    <EditorLayout onItemAdd={props.onItemAdd} title={props.title}>
      {props.items.length ? (
        props.items.map((item, index) => (
          <ItemRow
            key={item.value}
            item={item}
            itemIndex={index}
            onItemTitleChange={props.onItemTitleChange}
            onItemValueChange={props.onItemValueChange}
            onItemRemove={props.onItemRemove}
            onItemMove={(direction) =>
              props.onItemMove && props.onItemMove(index, direction)
            }
          />
        ))
      ) : (
        <div className="pt-6">
          <NEmpty />
        </div>
      )}
    </EditorLayout>
  );
};

ItemEditor.props = {
  title: {
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
