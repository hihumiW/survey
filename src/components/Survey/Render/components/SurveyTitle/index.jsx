import { NDropdown, NButton } from "naive-ui";
import SurveyTitleContainer from "@survey/components/SurveyTitleContainer";
import Title from "@survey/components/Title/index.vue";
const SurveyTitle = (props) => {
  return (
    <SurveyTitleContainer>
      {{
        title: () => <Title value={props.surveyTitle} />,
        description: () => <Title value={props.surveyDescription} />,
        category: () => (
          <NDropdown trigger="hover">
            <NButton class="text-base" text>
              Category
            </NButton>
          </NDropdown>
        ),
      }}
    </SurveyTitleContainer>
  );
};

SurveyTitle.props = {
  surveyTitle: String,
  surveyDescription: String,
};

export default SurveyTitle;
