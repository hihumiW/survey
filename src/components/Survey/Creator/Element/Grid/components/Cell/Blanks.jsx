import { computed, defineComponent, onMounted, ref, unref } from "vue";

import cellProps from "./cellProps";
import { useInjectCreator } from "@survey/hooks/useCreator";
import {
  LexicalComposer,
  LexicalRichTextPlugin,
  LexicalContentEditable,
  LexicalHistoryPlugin,
} from "lexical-vue";

import { BlankNode } from "@survey/plugins/BlankNode";
import BlankPlugin from "@survey/plugins/BlankPlugin";

const Blanks = defineComponent({
  props: cellProps,
  setup(props) {
    const { getModelV, updateQuestionFieldValueByPath } = useInjectCreator();
    const settingPath = computed(() => `${props.cellPath}.blankSettings`);
    const contentPath = computed(() => `${props.cellPath}.blankContent`);
    const settings = computed(() => getModelV(unref(settingPath)));
    const onBlankCreate = (blankId) => {
      const blankConfig = {
        id: blankId,
        type: "text",
      };
      updateQuestionFieldValueByPath(unref(settingPath), [
        ...unref(settings),
        blankConfig,
      ]);
    };
    const saveJson = (editorState) => {
      console.log("save", JSON.stringify(editorState.toJSON()));
      updateQuestionFieldValueByPath(
        unref(contentPath),
        JSON.stringify(editorState.toJSON())
      );
    };

    const state = getModelV(unref(contentPath));
    // console.log("state", state);
    // console.log(state);
    const editorConfig = {
      namespace: "blankContent",
      theme: {
        blank: "editor-blank",
        __injectConfig: {
          mode: "config",
        },
      },
      nodes: [BlankNode],
      editorState: JSON.stringify({
        root: {
          children: [
            {
              children: [],
              direction: null,
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
              textFormat: 0,
              textStyle: "",
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      }),
    };

    const onBlankDestory = (blankId) => {
      updateQuestionFieldValueByPath(
        unref(settingPath),
        unref(settings).filter((i) => i.id !== blankId)
      );
    };

    return () => {
      return (
        <LexicalComposer initialConfig={editorConfig} onError={console.error}>
          <div className="survey-blanks-editor ">
            <LexicalRichTextPlugin>
              {{
                contentEditable: () => (
                  <LexicalContentEditable class="editor-input" />
                ),
                placeholder: () => (
                  <div className="editor-placeholder">
                    Enter some plain text...
                  </div>
                ),
              }}
            </LexicalRichTextPlugin>
          </div>
          <LexicalHistoryPlugin />
          <BlankPlugin
            onSave={saveJson}
            onBlankCreate={onBlankCreate}
            onBlankDestory={onBlankDestory}
          />
        </LexicalComposer>
      );
    };
  },
});

export default Blanks;
