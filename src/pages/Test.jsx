import RenderSurvey from "@/components//Survey/Render";
import survey from "./survey.json";
import v from "./answer.json";
const surveyJSON = {
  questions: survey,
  description: "时间问题",
  title: "test",
};

console.log("survey", survey);
const values = v.answerMap;
console.log("values", values);

const Test = () => {
  return (
    <div>
      <RenderSurvey survey={surveyJSON} defaultValue={values} />
    </div>
  );
};

export default Test;
