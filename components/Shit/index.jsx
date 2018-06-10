import { pure } from "recompose";

const Shit = ({ size = 200, x = 0, y = 0 }) => {
  const circle = {
    top: `${y}px`,
    left: `${x}px`,
    fontSize: `${size}px`,
    position: "absolute"
  };

  return <div style={circle}>💩</div>;
};

export default Shit;
