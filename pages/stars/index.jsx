import io from "socket.io-client";
import { Listener } from "deltas";
import { Component } from "react";

import Container from "../../components/Container";

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
      delta: 15,
      action: (delta, angle) => {
        this.socket.emit(angle, { delta });
      }
    });

    this.socket.on("connect", () => {
      this.setState({ text: "Shake me!" });
    });

    this.socket.on("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

  onShake() {
    this.socket.emit("shake", { id: this.socket.id });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { text } = this.state;

    return (
      <Container>
        <Center>
          <h1>{text}</h1>
        </Center>
      </Container>
    );
  }
}
