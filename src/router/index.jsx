import CreateSurvey from "@/pages/Create";
import EditSurvey from "@/pages/Create/Edit";
import RenderSurvey from "@/pages/Survey/index.jsx";
import RenderHistorySurvey from "@/pages/Survey/History";
import SurveyList from "@/pages/List";
import PrintSurvey from "@/pages/Print/Survey/Survey";
import EthicalSurvey from "@/pages/EthicalSurvey";
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
    path: "/ethicalSurvey",
    name: "ethicalSurvey",
    component: EthicalSurvey,
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
  {
    path: "/printSurvey",
    name: "printSurvey",
    component: PrintSurvey,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
