<template>
  <div class="flex flex-col h-full relative survey-creator-container">
    <div class="flex-1 pl-3 bg-neutral-100 flex h-full">
      <div class="w-[160px] flex-shrink-0">
        <ToolBox />
      </div>
      <SurveyContainer :questions="surveyQuestions">
        <template #title>
          <SureveyTitle :creator="creator" />
        </template>
        <SurveyElement
          v-for="(question, index) in surveyQuestions"
          :key="question.name"
          :question="question"
          :path="String(index)"
        />
      </SurveyContainer>
    </div>
    <Teleport to="#sideBar">
      <SideBar />
    </Teleport>
    <div class="absolute -top-11 right-2 flex gap-x-4">
      <NButton type="primary" @click="handleSave" :loading="isSaving">
        Confirm
      </NButton>
      <NButton> Cancel </NButton>
      <NButton text title="collapse side bar" @click="toggleSideBarShow">
        <template #icon>
          <NIcon size="20">
            <ChevronForwardSharp v-if="showSideBar" />
            <ChevronBackSharp v-else />
          </NIcon>
        </template>
      </NButton>
    </div>
  </div>
</template>

<script setup>
import ToolBox from "./ToolBox/index.vue";
import SureveyTitle from "./components/SureveyTitle/index.vue";
import SurveyElement from "./Element/index.vue";
import SideBar from "./SideBar/index.vue";
import { Teleport } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMutation } from "vue-query";
import { saveForm } from "@/api";
import SurveyContainer from "../components/SurveyContainer";
import { NButton, NIcon } from "naive-ui";
import { ChevronForwardSharp, ChevronBackSharp } from "@vicons/ionicons5";
import { useInjectCreator } from "@survey/hooks/useCreator";

const creator = useInjectCreator();
const { surveyQuestions, showSideBar, toggleSideBarShow } = creator;
const { mutateAsync, isLoading: isSaving } = useMutation(saveForm);
const route = useRoute();
const router = useRouter();

const handleSave = () => {
  const form = creator.JSON();
  const { title = "", categoryId } = form;

  if (title.trim() === "") {
    return window.$message.error("请输入问卷名称");
  }
  if (!categoryId) {
    return window.$message.error("请选择问卷分类");
  }
  mutateAsync(form).then((formId) => {
    window.$message.success("保存成功");
    if (formId && route.name === "creator") {
      router.replace(`/creator/${formId}`);
    }
  });
};
</script>

<script>
export default {
  name: "SurveyCreator",
  components: { NButton },
};
</script>
