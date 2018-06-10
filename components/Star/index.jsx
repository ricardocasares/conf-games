import { pure } from "recompose";

const Star = ({ size = 200, x = 0, y = 0 }) => {
  const star = {
    top: `${y}px`,
    left: `${x}px`,
    fontSize: `${size}px`,
    position: "absolute"
  };

  return <div style={star}>⭐️</div>;
};

export default pure(Star);
