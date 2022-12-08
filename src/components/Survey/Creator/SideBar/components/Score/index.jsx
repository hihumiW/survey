import { NInputNumber } from "naive-ui";
import Vertical from "../Layout/Vertical";

const Score = (props) => {
  return (
    <Vertical title="Score">
      <NInputNumber
        size="large"
        value={props.value}
        onUpdate:value={props.onUpdate}
      />
    </Vertical>
  );
};

Score.props = {
  title: {
    type: String,
    default: "Score",
  },
  value: {
    type: Number,
  },
  onUpdate: {
    type: Function,
  },
};

export default Score;
