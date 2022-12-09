import SurveyRender from "../Render/index";

const Preview = (props) => {
  return <SurveyRender questions={props.creator.JSON()} />;
};

Preview.props = {
  creator: {
    type: Object,
    required: true,
  },
};

export default Preview;
