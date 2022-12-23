import { defineComponent, toRef, unref } from "vue";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import { usePanelConifigProvide } from "@survey/hooks/Panel/useConfigInject";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import PanelContainer from "@survey/components/PanelContainer";

import useVisibleIf from "@survey/Render/hooks/useVisibleIf";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import SurveyRenderElementDispatch from "../index";
import { NEmpty } from "naive-ui";

const Panel = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values } = props;

    const questionRef = toRef(props, "question");
    const visibleIf = useVisibleIf(question, values);
    const questionIndex = useQuestionIndex(question);

    usePanelConifigProvide(questionRef);

    const renderChildren = () => {
      if (!question.questions?.length)
        return (
          <div class="my-8">
            <NEmpty />
          </div>
        );

      return (
        <SurveyRenderElementDispatch
          {...props}
          questions={question.questions}
        />
      );
    };

    return () => {
      if (!unref(visibleIf)) return null;

      return (
        <QuestionContainer
          question={question}
          questionIndex={questionIndex.value}
        >
          <PanelContainer
            innerIndent={question.innerIndent}
            class="survey-question-panel-container"
          >
            {renderChildren()}
          </PanelContainer>
        </QuestionContainer>
      );
    };
  },
});

export default Panel;
