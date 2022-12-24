import { defineComponent, ref } from "vue";
import { NEmpty } from "naive-ui";
import EditorLayout from "../ItemsEditor/Layout/EditorLayout";
import ItemDetailContainer from "../ItemsEditor/Layout/ItemDetailContainer";
import ItemRow from "../ItemsEditor/ItemRow";
import Score from "../Score";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useChoices from "@survey/Creator/hooks/useChoices";

const ChoicesEditor = defineComponent({
  setup(props) {
    const { currentActiveItem, currentActivePath } = useInjectCreator();
    const {
      handleTitleChange,
      handleItemValueChange,
      handleItemAdd,
      handleItemRemove,
      handleItemScoreChange,
      handleItemMove,
    } = useChoices(currentActivePath);

    const showDetailIndex = ref();
    const handleItemEdit = (editItemIndex) => {
      if (showDetailIndex.value !== editItemIndex) {
        showDetailIndex.value = editItemIndex;
      } else {
        showDetailIndex.value = null;
      }
    };

    const handleScoreUpdate = (index) => (score) =>
      handleItemScoreChange(index, score);

    const renderItems = (choices) => {
      if (!choices?.length) {
        return (
          <div className="pt-6">
            <NEmpty />
          </div>
        );
      }
      return choices.map(renderItem);
    };

    const renderItem = (choice, choiceIndex) => (
      <ItemDetailContainer
        key={choice.value}
        showDetail={choiceIndex === showDetailIndex.value}
      >
        {{
          default: () => (
            <ItemRow
              item={choice}
              itemIndex={choiceIndex}
              onItemTitleChange={handleTitleChange}
              onItemValueChange={handleItemValueChange}
              onItemRemove={handleItemRemove}
              onEditClick={props.showScore ? handleItemEdit : undefined}
              onItemMove={(direction) => handleItemMove(choiceIndex, direction)}
            />
          ),
          detail: props.showScore
            ? () => (
                <Score
                  value={choice.score}
                  onUpdate={handleScoreUpdate(choiceIndex)}
                />
              )
            : undefined,
        }}
      </ItemDetailContainer>
    );

    return () => {
      return (
        <EditorLayout title="Choices" onItemAdd={handleItemAdd}>
          {renderItems(currentActiveItem.value.choices)}
        </EditorLayout>
      );
    };
  },
});

ChoicesEditor.props = {
  showScore: Boolean,
};

export default ChoicesEditor;
