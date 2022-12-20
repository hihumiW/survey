import { NSelect } from "naive-ui";
import SurveyTitleContainer from "@survey/components/SurveyTitleContainer";
import Title from "@survey/components/Title/index.vue";
const SurveyTitle = (props) => {
  return (
    <SurveyTitleContainer>
      {{
        title: () => <Title value={props.surveyTitle} />,
        description: () => <Title value={props.surveyDescription} />,
        category: () => (
          <NSelect
            options={props.formTypes}
            placeholder="FormTypes"
            label-field="name"
            value-field="id"
            value={props.categoryId}
            disabled
          />
        ),
      }}
    </SurveyTitleContainer>
  );
};

SurveyTitle.props = {
  surveyTitle: String,
  surveyDescription: String,
  categoryId: [String, Number],
  formTypes: Array,
};

export default SurveyTitle;
