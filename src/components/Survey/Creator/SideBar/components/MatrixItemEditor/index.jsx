import { computed, defineComponent, ref, unref } from "vue";
import { capitalize } from "lodash-es";
import EditorLayout from "../ItemsEditor/Layout/EditorLayout";
import ItemDetailContainer from "../ItemsEditor/Layout/ItemDetailContainer";
import ItemRow from "../ItemsEditor/ItemRow";
import Score from "../Score";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useItemEdit from "@survey/Creator/hooks/useItemEdit";
import questionTypeEnum from "@survey/util/questionTypeEnum";
const MatrixColumnRowsItemEditor = defineComponent({
  setup(props) {
    const titleName = capitalize(props.type);
    const templateName = props.type === "columns" ? "column" : "row";
    const { currentActiveItem, currentActivePath } = useInjectCreator();

    const {
      handleTitleChange,
      handleItemValueChange,
      handleItemAdd,
      handleItemRemove,
      handleItemScoreChange,
    } = useItemEdit({
      itemsPathRef: `${unref(currentActivePath)}.${props.type}`,
      itemValueTemplate: templateName,
    });

    const shouldShowEdit = computed(
      () =>
        unref(currentActiveItem).type !== questionTypeEnum.matrixinput &&
        props.type === "columns"
    );

    const handleScoreUpdate = (index) => (score) =>
      handleItemScoreChange(index, score);

    const showDetailIndex = ref();
    const handleItemEdit = unref(shouldShowEdit)
      ? (editItemIndex) => {
          if (showDetailIndex.value !== editItemIndex) {
            showDetailIndex.value = editItemIndex;
          } else {
            showDetailIndex.value = null;
          }
        }
      : undefined;

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
      const slots = {
        default: () => (
          <ItemRow
            item={item}
            itemIndex={itemIndex}
            onItemTitleChange={handleTitleChange}
            onItemValueChange={handleItemValueChange}
            onItemRemove={handleItemRemove}
            onEditClick={handleItemEdit}
          />
        ),
      };
      if (unref(shouldShowEdit)) {
        slots.detail = () => (
          <Score value={item.score} onUpdate={handleScoreUpdate(itemIndex)} />
        );
      }

      return (
        <ItemDetailContainer
          key={item.value}
          showDetail={itemIndex === showDetailIndex.value}
          v-slots={slots}
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
