<template>
  <div class="flex items-center">
    <div class="p-3 flex items-center cursor-move">
      <NIcon size="20px" color="#909090">
        <EllipsisVertical />
      </NIcon>
    </div>
    <input
      class="survey-sideBar-choiceItem_input textbase"
      placeholder="Choice value"
      :value="choice.value"
      @blur="handleValueInputBlur"
    />
    <input
      class="survey-sideBar-choiceItem_input"
      placeholder="Choive text"
      :value="choice.text"
      @input="handleTextChange"
    />
    <NButton text class="p-3" @click="$emit('remove', props.choiceIndex)">
      <template #icon>
        <NIcon size="20px">
          <RemoveCircleOutline />
        </NIcon>
      </template>
    </NButton>
  </div>
</template>

<script setup>
import { NIcon, NButton } from "naive-ui";
import { EllipsisVertical, RemoveCircleOutline } from "@vicons/ionicons5";
import { nextTick } from "vue";

const emit = defineEmits(["titleChange", "valueChange", "remove"]);
const props = defineProps({
  choice: {
    type: Object,
    required: true,
  },
  choiceIndex: {
    type: Number,
    required: true,
  },
});

const handleValueInputBlur = (e) => {
  const val = e.target.value;
  emit("valueChange", props.choiceIndex, val);
  nextTick(() => {
    e.target.value = props.choice.value;
  });
};

// 受控input
const handleTextChange = (e) => {
  const val = e.target.value;
  emit("titleChange", props.choiceIndex, val);
  nextTick(() => {
    e.target.value = props.choice.text;
  });
};
</script>

<style>
.survey-sideBar-choiceItem_input {
  border: 2px solid transparent;
  align-self: stretch;
  outline: none;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0.6rem;
  padding-left: 0px;
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
}
.survey-sideBar-choiceItem_input:focus {
  border-color: #18a058;
}
</style>
