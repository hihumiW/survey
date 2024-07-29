import { defineComponent, unref } from "vue";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import { useParagraphStyleClassName } from "@survey/hooks/Element/Paragraph";

const Paragraph = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const styleClassName = useParagraphStyleClassName(props.question);
    return () => {
      return (
        <div className={unref(styleClassName)}>{props.question.title}</div>
      );
    };
  },
});

export default Paragraph;
