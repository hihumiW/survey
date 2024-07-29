import { Question } from "../Survey";

const Panel = (props) => {
  const { data, values } = props;

  return (
    <div className="flex flex-col gap-y-2">
      {data.questions.map((qus, idx) => (
        <Question key={idx} data={qus} values={values} />
      ))}
    </div>
  );
};

export default Panel;
