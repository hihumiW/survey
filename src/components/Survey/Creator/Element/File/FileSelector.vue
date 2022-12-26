<template>
  <NUpload disabled>
    <NUploadDragger class="survey-upload">
      <FileContainer :theme="osThemeRef" />
    </NUploadDragger>
  </NUpload>
</template>

<script setup>
import { NUploadDragger, NUpload, useOsTheme } from "naive-ui";
import FileContainer from "@survey/components/FileContainer";
const osThemeRef = useOsTheme();
</script>
