import CreateSurvey from "@/components/Survey/Create";
import EditSurvey from "@/components/Survey/Edit";
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/creator",
    name: "creator",
    component: CreateSurvey,
  },
  {
    path: "/creator/:formId",
    name: "editCreator",
    component: EditSurvey,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
