import io from "socket.io-client";
import { Listener } from "deltas";
import { Component } from "react";

import Container from "../../components/Container";

export default class extends Component {
  state = {
    text: "Connecting..."
  };

  static async getInitialProps({ query }) {
    const { room = "default" } = query;

    return { room };
  }

  componentDidMount() {
    const { room } = this.props;

    this.socket = io({
      query: {
        room
      }
    });

    this.moves = new Listener({
      delta: 5,
      action: this.onMotion.bind(this)
    });

    this.socket.on("connect", () => {
      this.setState({ text: "Get some stars!" });
    });

    this.socket.on("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

  onMotion(delta, angle) {
    console.log(delta, angle);
    this.socket.emit("motion", { id: this.socket.id, delta, angle });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { text } = this.state;

    return (
      <Container style={{ flexDirection: "column" }}>
        <Center>
          <h1>{text}</h1>
        </Center>
      </Container>
    );
  }
}

const Center = ({ children }) => {
  const style = {
    flex: "0 auto",
    alignSelf: "center",
    justifyContent: "center",
    color: "white",
    width: "100%",
    display: "flex",
    textShadow: "1px 1px 1px black",
    fontWeight: "500",
    fontSize: "28px"
  };

  return <div style={style}>{children}</div>;
};
