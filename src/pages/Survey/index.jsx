import { defineComponent } from "vue";
import RenderSurvey from "@/components//Survey/Render";
import { useRoute, useRouter } from "vue-router";
import { NButton } from "naive-ui";
import LoadSurvey from "@/Layout/LoadSurvey";

const testDefaultValue = {
  projectNo: "ccc",
  projectName: "ccc",
  cfdaProApprovalNo: "",
  testCategory: "3",
  setupTime: 1723046400000,
  startTime: 1723046400000,
  expectedEndTime: null,
  expectedSubjectsNum: 1,
  mainResearcherAccount: "pi",
  ethicalApprovalNo: null,
  state: "NOT_APPROVED",
  stateProcess: "NOT_COMPLETE",
  source: "ctms",
  id: "0",
  formToken: "d84306eb-18b8-4dc5-9558-0a9cfbcc6fa5",
  ethicalFilePath: "aaf2a40e-d102-4b34-a816-447fdbaa961c",
  deptCode: "院领导",
  bidPartyCro: "申办方测试",
  PISign: "6ndeo72u8va",
};
const Survey = defineComponent({
  props: {
    data: Object,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const renderBackButton = () => {
      if (route.query.hideBack) {
        return null;
      }
      return (
        <div class="bg-neutral-100 p-4 dark:bg-neutral-800">
          <NButton onClick={() => router.back()}>返回</NButton>
        </div>
      );
    };

    return () => {
      if (!props.data) return;
      const formId = route.params.formId;
      const key = `Survey_${formId}`;
      return (
        <div class="h-full flex flex-col">
          {renderBackButton()}
          <RenderSurvey
            key={key}
            survey={props.data}
            formId={formId}
            defaultValue={testDefaultValue}
            readOnly={!!route.query.readOnly}
            hideSubmit={!!route.query.hideSubmit}
          />
        </div>
      );
    };
  },
});

const SurveyWrapper = () => {
  return (
    <LoadSurvey>
      {{
        default: (props) => {
          return <Survey data={props.data} />;
        },
      }}
    </LoadSurvey>
  );
};
SurveyWrapper.displayName = "SurveyWrapper";
export default SurveyWrapper;
