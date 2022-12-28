import { unref } from "vue";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";

const SurveyContainer = (props, { slots }) => {
  const shouldFullWidth = Boolean(
    unref(props.questions)?.find((question) =>
      [
        QuestionTypeEnum.matrixradio,
        QuestionTypeEnum.matrixcheckbox,
        QuestionTypeEnum.matrixinput,
        QuestionTypeEnum.matrixdropdown,
        QuestionTypeEnum.grid,
      ].includes(question.type)
    )
  );
  return (
    <div className="flex-1 min-h-0 h-full overflow-y-auto">
      <div
        class={[
          "mx-auto flex flex-col gap-y-10",
          shouldFullWidth ? "mx-6" : " max-w-[800px]",
        ]}
      >
        {slots.title()}
        <div class="flex flex-col gap-y-8">{slots.default()}</div>
        <div>{slots.footer && slots.footer()}</div>
      </div>
    </div>
  );
};

SurveyContainer.props = {
  questions: {
    type: Object,
    required: true,
  },
};

export default SurveyContainer;
