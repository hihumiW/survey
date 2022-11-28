<template>
  <VueJsonPretty :data="jsonData" />
</template>

<script setup>
import VueJsonPretty from "vue-json-pretty";
import { inject } from "vue";
import "vue-json-pretty/lib/styles.css";

const { JSON } = inject("creator");
const jsonData = JSON();
</script>
