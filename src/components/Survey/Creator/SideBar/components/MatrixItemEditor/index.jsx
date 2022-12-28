import { computed, defineComponent, unref } from "vue";
import { capitalize } from "lodash-es";
import EditorLayout from "../ItemsEditor/Layout/EditorLayout";
import ItemRow from "../ItemsEditor/ItemRow";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useItemEdit from "@survey/Creator/hooks/useItemEdit";
import { getMatrixColumnType } from "@survey/Creator/hooks/useMatrixEdit";

const MatrixColumnRowsItemEditor = defineComponent({
  setup(props) {
    const titleName = props.type === "columns" ? "列设置" : "行设置";
    const templateName = props.type === "columns" ? "column" : "row";
    const { currentActiveItem, currentActivePath, onQuestionItemClick } =
      useInjectCreator();

    const {
      handleTitleChange,
      handleItemValueChange,
      handleItemAdd,
      handleItemRemove,
      handleItemMove,
    } = useItemEdit({
      itemsPathRef: `${unref(currentActivePath)}.${props.type}`,
      itemValueTemplate: templateName,
    });

    const handleItemEdit = computed(() => {
      if (props.type === "columns") {
        return (columnIndex, column) => {
          const matrixQuestionPath = unref(currentActivePath);
          const matrixQuestion = unref(currentActiveItem);
          onQuestionItemClick(
            `${matrixQuestionPath}.columns.${columnIndex}`,
            getMatrixColumnType(matrixQuestion.type)
          );
        };
      }
    });

    const renderItems = (items) => {
      if (!items?.length) {
        return (
          <div className="pt-6">
            <NEmpty />
          </div>
        );
      }
      return items.map(renderItem);
    };

    const renderItem = (item, itemIndex) => {
      return (
        <ItemRow
          key={item.value}
          item={item}
          itemIndex={itemIndex}
          onItemTitleChange={handleTitleChange}
          onItemValueChange={handleItemValueChange}
          onItemRemove={handleItemRemove}
          onEditClick={handleItemEdit.value}
          onItemMove={(direction) => handleItemMove(itemIndex, direction)}
        />
      );
    };

    return () => {
      return (
        <EditorLayout title={titleName} onItemAdd={handleItemAdd}>
          {renderItems(unref(currentActiveItem)?.[props.type] || [])}
        </EditorLayout>
      );
    };
  },
});

MatrixColumnRowsItemEditor.props = {
  type: {
    type: String,
    default: "columns",
  },
};

export default MatrixColumnRowsItemEditor;
