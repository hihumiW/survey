<template>
  <span
    :class="[
      'survey-title rounded-md  inline-block px-1.5 break-all',
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
  const inputText = e.target.innerText;
  editable.value = false;
  if (inputText === props.value) return;
  emit("update:value", inputText);
};
</script>

<style scoped>
.survey-title:empty::before {
  content: attr(aria-placeholder);
  color: #909090;
}
.survey-title:focus {
  color: #161616;
  outline-color: #18a058;
}
.survey-title.editable:not(:focus):hover {
  background-color: rgba(24, 160, 88, 0.12);
}
</style>
