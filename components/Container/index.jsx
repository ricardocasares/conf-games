const Container = ({ children }) => {
  const style = {
    display: "flex",
    height: "100%",
    flexDirection: "row"
  };

  return <section style={style}>{children}</section>;
};

export default Container;
