<template>
  <span
    class="survey-title rounded-md cursor-text inline-block px-1.5 break-all"
    contenteditable
    role="textbox"
    spellcheck="true"
    :aria-placeholder="props.placeholder"
    @blur="handleTitleBlur"
  >
    {{ props.value }}
  </span>
</template>

<script setup>
const props = defineProps({
  placeholder: String,
  value: String,
});

const emit = defineEmits(["update:value"]);

const handleTitleBlur = (e) => {
  const inputText = e.target.innerText;
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
.survey-title:not(:focus):hover {
  background-color: rgba(24, 160, 88, 0.12);
}
</style>
