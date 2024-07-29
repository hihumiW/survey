import { defineComponent, computed, toRef, unref } from "vue";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import Title from "@survey/components/Title/index.vue";
import { useInjectCreator } from "@survey/hooks/useCreator";
import { useParagraphStyleClassName } from "@survey/hooks/Element/Paragraph";
const Paragraph = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const questionRef = toRef(props, "question");
    const { generateFieldPathBinder } = useInjectCreator();
    const titlePath = computed(() => `${props.path}.title`);
    const onTitleChange = generateFieldPathBinder(titlePath);
    const paragraphClassName = useParagraphStyleClassName(questionRef);
    return () => {
      return (
        <div className={unref(paragraphClassName)}>
          <Title
            value={props.question.title}
            onUpdate:value={onTitleChange}
            editable
          />
        </div>
      );
    };
  },
});

export default Paragraph;
