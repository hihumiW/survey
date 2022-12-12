import Title from "../Title/index.vue";
import "./QuestionTitle.css";
const QuestionTitle = (props, { emit }) => {
  if (props.hideTitleWhenEmpty && !props.question.title) return null;
  return (
    <div class="flex flex-col gap-y-1">
      <div
        class={[
          "text-base font-bold survey-question_title flex",
          props.question.isRequired && "required",
        ]}
      >
        {props.questionIndex !== -1 && (
          <span className="flex-shrink-0 text-neutral-500 text-sm mt-1 cursor-default">
            {props.questionIndex}.
          </span>
        )}
        <Title
          class="min-w-0"
          value={props.question.title}
          placeholder={props.placeholder}
          editable={props.editable}
          onUpdate:value={(value) => emit("titleChange", value)}
        />
      </div>
    </div>
  );
};

QuestionTitle.emit = ["titleChange"];
QuestionTitle.props = {
  hideTitleWhenEmpty: Boolean,
  questionIndex: {
    type: Number,
    default: -1,
  },
  question: {
    type: Object,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Question title",
  },
};

export default QuestionTitle;
