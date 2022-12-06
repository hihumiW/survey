import EditorLayout from "./Layout/EditorLayout";
import ItemRow, { ItemRowEventProps } from "./ItemRow";
import { NEmpty } from "naive-ui";

const ItemEditor = (props) => {
  return (
    <EditorLayout onItemAdd={props.onItemAdd} title={props.title}>
      {props.items.length ? (
        props.items.map((item, index) => (
          <ItemRow
            item={item}
            itemIndex={index}
            onItemTitleChange={props.onItemTitleChange}
            onItemValueChange={props.onItemValueChange}
            onItemRemove={props.onItemRemove}
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
