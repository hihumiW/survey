import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  unref,
} from "vue";
import cellProps from "./cellProps";
import { getRandomId } from "@survey/utils";
import { useInjectCreator } from "@survey/hooks/useCreator";

const getBlankConfig = () => {
  return {
    id: getRandomId(),
    type: "text",
  };
};

const Blanks = defineComponent({
  props: cellProps,
  setup(props) {
    const { getModelV, updateQuestionFieldValueByPath } = useInjectCreator();
    const eidtorRef = ref();
    const settingPath = computed(() => `${props.cellPath}.blankSettings`);
    const settings = computed(() => getModelV(unref(settingPath)));
    const addBlankSetting = (blankConfig) =>
      updateQuestionFieldValueByPath(unref(settingPath), [
        ...unref(settings),
        blankConfig,
      ]);
    const removeBlankSetting = (blankId) => {
      updateQuestionFieldValueByPath(
        unref(settingPath),
        unref(settings).filter((i) => i.id !== blankId)
      );
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.removedNodes.forEach((node) => {
            if (node.nodeName === "SPAN") {
              const blankId = node.getAttribute("blankId");
              if (!blankId) return;
              removeBlankSetting(blankId);
            }
          });
        }
      });
    });
    onMounted(() => {
      observer.observe(eidtorRef.value, {
        childList: true,
      });
    });
    onUnmounted(() => {
      observer.disconnect();
    });

    const checkFocus = (anchorNode, anchorOffset) => {
      let offset = -1;
      if (anchorNode === unref(eidtorRef) && anchorOffset) {
        offset = anchorOffset;
      }
      unref(eidtorRef).childNodes.forEach((node, idx) => {
        if (node?.nodeName !== "SPAN") return;
        if (offset === idx) {
          node.classList.add("hightLight");
          unref(eidtorRef).classList.add("hightBlank");
        } else {
          node.classList.remove("hightLight");
          unref(eidtorRef).classList.remove("hightBlank");
        }
      });
    };
    const checkCaret = (
      oldAnchorNode,
      oldAnchorOffset,
      anchorNode,
      anchorOffset
    ) => {
      console.log({ node: oldAnchorNode, offset: oldAnchorOffset }, ">>>>>", {
        node: anchorNode,
        offset: anchorOffset,
      });
    };
    onMounted(() => {
      const el = unref(eidtorRef);
      if (!el) return;
      el.addEventListener(
        "keydown",
        (e) => {
          const { anchorNode: oldAnchorNode, anchorOffset: oldAnchorOffset } =
            window.getSelection();
          requestAnimationFrame(() => {
            const { anchorNode, anchorOffset } = window.getSelection();
            checkCaret(
              oldAnchorNode,
              oldAnchorOffset,
              anchorNode,
              anchorOffset
            );
            // checkFocus(anchorNode, anchorOffset);
          });
        },
        false
      );
    });
    const htmlContent = ref(``);
    const onHtmlContentChange = (e) => {
      const { data, inputType } = e;
      const selection = window.getSelection();
      const { anchorNode } = selection;
      if (inputType === "insertText") {
        if (data === "_") {
          const nodeText = anchorNode.textContent;
          const reg = /_{2,}/g;
          const result = reg.exec(nodeText);
          if (result?.length) {
            const replaceContent = nodeText.replace(reg, "");
            anchorNode.textContent = replaceContent;
            selection.setPosition(anchorNode, result.index);
            const range = selection.getRangeAt(0);
            const ancestorContainer = range.commonAncestorContainer;
            const start = range.startOffset;
            const text = ancestorContainer.textContent;
            const blankConfig = getBlankConfig();
            const blank = document.createElement("span");
            blank.setAttribute("blankId", blankConfig.id);
            addBlankSetting(blankConfig);
            blank.contentEditable = false;
            blank.className = "fillBlank";
            // const emptyNode = document.createTextNode("\u200B");
            const firstTextNode = document.createTextNode(
              text.substring(0, start)
            );
            const lastTextNode = document.createTextNode(text.substring(start));
            const frag = new DocumentFragment();
            frag.append(firstTextNode, blank, lastTextNode);
            ancestorContainer.replaceWith(frag);
            range.setEnd(lastTextNode, 0);
            range.collapse();
          }
          return e.preventDefault();
        }
      }
    };

    return () => {
      return (
        <div
          ref={eidtorRef}
          contentEditable
          className="text-left p-1 min-h-[32px] survey-blanks-editor"
          onInput={onHtmlContentChange}
          onFocus={() => {
            const { anchorNode, anchorOffset } = window.getSelection();
            checkFocus(anchorNode, anchorOffset);
          }}
          v-html={unref(htmlContent)}
        ></div>
      );
    };
  },
});

export default Blanks;
