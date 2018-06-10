export const DIAMETER = 100;

const Circle = ({ color = "red", x = 0, y = 0 }) => {
  const lane = {
    width: "100%",
    height: "100vh",
    flex: "1 auto",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    borderLeft: "2px solid #FFF",
    borderRight: "2px solid #FFF",
    borderBottom: "30px solid #FFF"
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
