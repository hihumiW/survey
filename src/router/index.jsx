import CreateSurvey from "@/pages/Create";
import EditSurvey from "@/pages/Create/Edit";
import RenderSurvey from "@/pages/Survey";
import RenderHistorySurvey from "@/pages/Survey/History";
import SurveyList from "@/pages/List";
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
  {
    path: "/survey/:formId",
    name: "renderSurvey",
    component: RenderSurvey,
  },
  {
    path: "/survey/history/:formId",
    name: "renderHistorySurvey",
    component: RenderHistorySurvey,
  },
  {
    path: "/",
    name: "surveyList",
    component: SurveyList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
