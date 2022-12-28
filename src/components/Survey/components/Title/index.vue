<template>
  <span
    :class="[
      'survey-title rounded-md  inline-block pr-1.5 break-all',
      props.editable ? 'editable cursor-text' : 'cursor-default',
    ]"
    :contenteditable="editable"
    role="textbox"
    spellcheck="true"
    :aria-placeholder="props.placeholder"
    @click="handleClick"
    @blur="handleTitleBlur"
  >
    {{ props.value }}
  </span>
</template>

<script setup>
import { ref, nextTick } from "vue";
const props = defineProps({
  placeholder: String,
  value: String,
  editable: Boolean,
  maxlength: Number,
});

const editable = ref(false);
const emit = defineEmits(["update:value"]);
const handleClick = (e) => {
  if (!props.editable) return;
  editable.value = true;
  nextTick(() => {
    e.target.focus();
  });
};

const handleTitleBlur = (e) => {
  let inputText = e.target.innerText;
  if (inputText === props.value) return;
  if (props.maxlength && inputText.length > props.maxlength) {
    inputText = inputText.substring(0, props.maxlength);
  }
  emit("update:value", inputText);
  nextTick(() => {
    e.target.innerText = props.value;
    editable.value = false;
  });
};
</script>
