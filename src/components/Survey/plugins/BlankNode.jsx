import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_NORMAL,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
} from "lexical";
import { useLexicalComposer, useLexicalNodeSelection } from "lexical-vue";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  unref,
} from "vue";

export class BlankNode extends DecoratorNode {
  static getType() {
    return "blankNode";
  }

  static clone(node) {
    return new BlankNode(node.__blankId, node.__onRemove, node.__key);
  }

  __blankId;

  __onRemove;

  constructor(blankId, onRemove, key = undefined) {
    super(key);
    this.__blankId = blankId;
    this.__onRemove = onRemove;
  }

  createDOM(config) {
    const div = document.createElement("div");
    const className = config.theme.blank;
    const isConfigMode = config.theme.__injectConfig.mode === "config";
    const isPrintMode = config.theme.__injectConfig.mode === "print";
    if (className !== undefined) {
      div.classList.add(className);
      isConfigMode && div.classList.add("config");
      isPrintMode && div.classList.add("print");
    }
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate(_, config) {
    if (config.theme.__injectConfig?.mode === "input") {
      return <BlankInput blankId={this.__blankId} />;
    }
    if (config.theme.__injectConfig?.mode === "print") {
      return <BlankPrint blankId={this.__blankId} />;
    }
    return <BlankFill nodeKey={this.__key} />;
  }

  static importJSON(serializedNode) {
    const node = $createBlankNode(serializedNode.blankId);
    return node;
  }

  exportJSON() {
    return {
      type: "blankNode",
      blankId: this.__blankId,
      version: 1,
    };
  }

  getBlankId() {
    return this.__blankId;
  }
  remove(preserveEmptyParent) {
    super.remove(preserveEmptyParent);
    this.__onRemove && this.__onRemove(this.__blankId);
  }

  setOnRemove(onRemove) {
    const self = this.getWritable();
    onRemove && (self.__onRemove = onRemove);
  }
}

const BlankInput = defineComponent({
  name: "BlankInput",
  props: ["blankId"],
  setup(props) {
    const value = inject("value");
    const onValueChange = inject("onValueChange");
    const blankSettings = inject("blankSettings");
    const settings = computed(() => {
      return unref(blankSettings)?.find((i) => i.id === props.blankId);
    });

    const disabled = inject("disabled");

    return () => {
      return (
        <input
          className="blankInput"
          value={unref(value)?.[props.blankId] || ""}
          onInput={(e) => onValueChange(props.blankId, e.target.value)}
          type={unref(settings)?.type}
          disabled={disabled}
        />
      );
    };
  },
});

const BlankFill = defineComponent({
  props: ["nodeKey"],
  name: "BlankFill",
  setup(props) {
    const { isSelected, setSelected } = useLexicalNodeSelection(props.nodeKey);
    const editor = useLexicalComposer();
    onMounted(() => {
      const removeBackSpaceCommand = editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        (event) => {
          if (unref(isSelected) && $isNodeSelection($getSelection())) {
            event.preventDefault();

            const node = $getNodeByKey(props.nodeKey);
            if ($isBlankNode(node)) {
              node.remove();
              return true;
            }
          }
          return false;
        },
        COMMAND_PRIORITY_NORMAL
      );

      const removeClickCommand = editor.registerCommand(
        CLICK_COMMAND,
        (event) => {
          const element = editor.getElementByKey(props.nodeKey);
          if (element === event.target) {
            setSelected(true);
          }
        },
        COMMAND_PRIORITY_NORMAL
      );
      onUnmounted(() => {
        removeBackSpaceCommand();
        removeClickCommand();
      });
    });
    return () => {
      return (
        <div
          className={unref(isSelected) ? "blankFill focused" : "blankFill"}
        />
      );
    };
  },
});

const BlankPrint = defineComponent({
  props: ["blankId"],
  setup(props) {
    const { blankId } = props;
    const value = inject("value");
    const v = value?.[blankId];
    return () => v;
  },
});

export const $createBlankNode = (blankId, onRemove) =>
  new BlankNode(blankId, onRemove);

export const $isBlankNode = (node) => node instanceof BlankNode;
