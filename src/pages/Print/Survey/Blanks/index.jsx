import { defineComponent, provide } from "vue";
import { BlankNode } from "@survey/plugins/BlankNode";
import BlankPlugin from "@survey/plugins/BlankPlugin";
import {
  LexicalComposer,
  LexicalRichTextPlugin,
  LexicalContentEditable,
} from "lexical-vue";

const Blanks = defineComponent({
  props: ["blankSettings", "blankContent", "value"],
  setup(props) {
    const { blankContent, value } = props;
    provide("value", value);
    const editorConfig = {
      namespace: "blankContent",
      theme: {
        blank: "editor-blank",
        __injectConfig: {
          mode: "print",
        },
      },
      nodes: [BlankNode],
      editorState:
        typeof blankContent === "string"
          ? blankContent
          : JSON.stringify(blankContent),
      editable: false,
    };
    console.log("editorConfig", editorConfig);

    return () => (
      <LexicalComposer initialConfig={editorConfig} onError={console.error}>
        <div className="survey-blanks-editor ">
          <LexicalRichTextPlugin>
            {{
              contentEditable: () => <LexicalContentEditable />,
            }}
          </LexicalRichTextPlugin>
        </div>
        <BlankPlugin />
      </LexicalComposer>
    );
  },
});

export default Blanks;
