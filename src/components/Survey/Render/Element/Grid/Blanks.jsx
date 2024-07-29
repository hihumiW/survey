import { computed, defineComponent, provide } from "vue";
import { BlankNode } from "@survey/plugins/BlankNode";
import BlankPlugin from "@survey/plugins/BlankPlugin";
import {
  LexicalComposer,
  LexicalRichTextPlugin,
  LexicalContentEditable,
} from "lexical-vue";

const Blanks = defineComponent({
  name: "RenderBlanks",
  props: ["cellInfo", "cellValue", "disabled"],
  emits: ["blankValueChange"],
  setup(props, { emit }) {
    const state = props.cellInfo.blankContent;
    const editorConfig = {
      namespace: "blankContent",
      theme: {
        blank: "editor-blank",
        __injectConfig: {
          mode: "input",
        },
      },
      nodes: [BlankNode],
      editorState: typeof state === "string" ? state : JSON.stringify(state),
      editable: false,
    };

    provide(
      "value",
      computed(() => props.cellValue)
    );
    provide("onValueChange", (...arg) => emit("blankValueChange", ...arg));

    provide("blankSettings", props.cellInfo.blankSettings);

    provide("disabled", props.disabled);

    return () => {
      return (
        <LexicalComposer initialConfig={editorConfig} onError={console.error}>
          <div className="survey-blanks-editor ">
            <LexicalRichTextPlugin>
              {{
                contentEditable: () => (
                  <LexicalContentEditable class="editor-input" />
                ),
              }}
            </LexicalRichTextPlugin>
          </div>
          <BlankPlugin />
        </LexicalComposer>
      );
    };
  },
});
export default Blanks;
