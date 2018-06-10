import { pure } from "recompose";

export const DIAMETER = 100;

const Ship = ({ color = "red", x = 0, y = 0 }) => {
  const circle = {
    width: `${DIAMETER}px`,
    height: `${DIAMETER}px`,
    background: color,
    transition: "transform .4s",
    willChange: "transform",
    transform: `translate(${x}px, ${y}px)`,
    borderRadius: "50%",
    fontSize: "200px"
  };

  return <div style={circle} />;
};

export default pure(Ship);
