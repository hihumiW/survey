import { defineComponent, ref } from "vue";
import { NButton } from "naive-ui";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import SurveyRender from "../Render/index";

const Preview = defineComponent({
  props: {
    creator: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const result = ref();
    const handleSurveySubmit = (values) => {
      result.value = values;
    };

    const handleDoAgain = () => {
      result.value = null;
    };

    return () => {
      if (result.value) {
        return (
          <ResultPreview result={result.value} onDoAgain={handleDoAgain} />
        );
      }
      return (
        <SurveyRender
          survey={props.creator.JSON()}
          onSurveySubmit={handleSurveySubmit}
        />
      );
    };
  },
});

const ResultPreview = (props) => {
  return (
    <div class="flex flex-col gap-y-6 mt-32">
      <p class="text-3xl text-center"> Result </p>
      <div className="w-[800px] h-[500px] mx-auto border border-neutral-300  overflow-y-auto">
        <VueJsonPretty data={props.result} />
      </div>
      <p className="text-center">
        <NButton size="large" type="primary" onClick={props.onDoAgain}>
          Do Again
        </NButton>
      </p>
    </div>
  );
};

ResultPreview.props = {
  result: {
    type: Object,
  },
  onDoAgain: {
    type: Function,
  },
};

export default Preview;
