import { defineComponent } from "vue";
const SurveyPreview = defineComponent({
  setup(props) {
    console.log(props.questions);
    return () => {
      return <div>Preview</div>;
    };
  },
});

SurveyPreview.props = {
  questions: {
    type: Object,
    required: true,
  },
};

export default SurveyPreview;
