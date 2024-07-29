import {
  $insertNodes,
  $wrapNodeInElement,
  $isRootOrShadowRoot,
  $createParagraphNode,
  TextNode,
  createCommand,
  COMMAND_PRIORITY_NORMAL,
  $getNodeByKey,
  BLUR_COMMAND,
} from "lexical";

import { useLexicalComposer } from "lexical-vue";
import { defineComponent, onMounted, onUnmounted } from "vue";
import { $createBlankNode, $isBlankNode, BlankNode } from "./BlankNode";
import { getRandomId } from "@survey/utils";

export const INSERT_BLANK = createCommand("insertBlank");

const INPUT_DETECT_CONTENT = "__";
const INPUT_DETECT_CONTENT_LENGTH = INPUT_DETECT_CONTENT.length;

const BlankPlugin = defineComponent({
  emits: ["blankCreate", "blankDestory", "save"],
  setup(_, { emit }) {
    const editor = useLexicalComposer();
    const onRemove = (blankId) => {
      emit("blankDestory", blankId);
    };
    onMounted(() => {
      if (!editor.hasNode(BlankNode)) {
        throw Error("BlankPlugin: BlankNode not registered on editor ");
      }
      const removeInsertCommand = editor.registerCommand(
        INSERT_BLANK,
        () => {
          const blankId = getRandomId();
          const node = $createBlankNode(blankId, onRemove);
          $insertNodes([node]);
          if ($isRootOrShadowRoot(node.getParentOrThrow())) {
            $wrapNodeInElement(node, () => $createParagraphNode()).selectEnd();
          }
        },
        COMMAND_PRIORITY_NORMAL
      );

      const removeInputTransform = editor.registerNodeTransform(
        TextNode,
        (textNode) => {
          const textContent = textNode.getTextContent();
          const replaceOffset = textContent.indexOf(INPUT_DETECT_CONTENT);
          if (replaceOffset !== -1) {
            let targetNode;
            const splitOffsetEnd = replaceOffset + INPUT_DETECT_CONTENT_LENGTH;
            if (replaceOffset === 0) {
              [targetNode] = textNode.splitText(replaceOffset, splitOffsetEnd);
            } else {
              [, targetNode] = textNode.splitText(
                replaceOffset,
                splitOffsetEnd
              );
            }
            const blankId = getRandomId();
            const blankNode = $createBlankNode(blankId, onRemove);
            targetNode.replace(blankNode);
            // if (blankNode.getNextSibling() === null) {
            //   // 插入一个带空格的textNode
            //   const textNode = $createTextNode("\u200B");
            //   blankNode.insertAfter(textNode, true);
            // }
          }
        }
      );

      const removeMutationListenner = editor.registerMutationListener(
        BlankNode,
        (mutations) => {
          mutations.forEach((mutation, nodeKey) => {
            editor.getEditorState().read(() => {
              const blankId = $getNodeByKey(nodeKey)?.getBlankId();
              if (!blankId) return;
              if (mutation === "updated") return;
              if (mutation === "created") {
                emit("blankCreate", blankId);
              }
              emit("save", editor.getEditorState());
            });
          });
        }
      );

      const removeBlurRegister = editor.registerCommand(
        BLUR_COMMAND,
        () => {
          emit("save", editor.getEditorState());
        },
        COMMAND_PRIORITY_NORMAL
      );

      editor.update(() => {
        editor._editorState._nodeMap.forEach((node) => {
          if ($isBlankNode(node)) {
            node.setOnRemove(onRemove);
          }
        });
      });

      onUnmounted(() => {
        removeInsertCommand();
        removeInputTransform();
        removeMutationListenner();
        removeBlurRegister();
      });
    });
    return () => {
      return null;
    };
  },
});

export default BlankPlugin;
