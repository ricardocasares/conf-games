export const DIAMETER = 100;

const Circle = ({ color = "red", x = 0, y = 0 }) => {
  const lane = {
    width: `${DIAMETER}px`,
    height: "100vh",
    padding: "20px"
  };

  const circle = {
    width: `${DIAMETER}px`,
    height: `${DIAMETER}px`,
    background: color,
    transition: "transform .4s",
    willChange: "transform",
    transform: `translateY(${y}px)`,
    borderRadius: "50%"
  };

  return (
    <div style={lane}>
      <div style={circle} />
    </div>
  );
};

export default Circle;
