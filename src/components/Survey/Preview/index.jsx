import SurveyRender from "../Render/index";
// import data from "./data";

const Preview = (props) => {
  return <SurveyRender survey={props.creator.JSON()} />;
};

Preview.props = {
  creator: {
    type: Object,
    required: true,
  },
};

export default Preview;