import { defineComponent, unref } from "vue";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";

const Layout = defineComponent({
  props: ["data"],
  setup(props, { slots }) {
    const { data } = props;
    const { indent = 0, innerIndent = 0, title = "" } = data;
    const questionIndex = useQuestionIndex(data);
    const quesTitle =
      unref(questionIndex) !== -1 ? `${unref(questionIndex)}.${title}` : title;
    return () => {
      return (
        <div
          className="flex flex-col gap-y-1 text-xs text-black"
          style={{
            "--indentWidth": "1rem",
            marginLeft: `calc(var(--indentWidth) * ${indent})`,
          }}
        >
          {quesTitle && <p>{quesTitle}</p>}
          {slots.default && (
            <div
              style={{
                marginLeft: `calc(var(--indentWidth) * ${innerIndent})`,
              }}
            >
              {slots.default()}
            </div>
          )}
        </div>
      );
    };
  },
});

export default Layout;
