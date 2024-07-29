import { useParagraphStyleClassName } from "@survey/hooks/Element/Paragraph";
import { defineComponent, unref } from "vue";

const Paragraph = defineComponent({
  props: ["data"],
  setup(props) {
    const { data } = props;
    const style = useParagraphStyleClassName(props.data);
    return () => {
      return <p className={unref(style)}>{data.title}</p>;
    };
  },
});

export default Paragraph;
