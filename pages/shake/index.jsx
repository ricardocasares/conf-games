import io from "socket.io-client";
import Shake from "@zouloux/shake";
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
    text: "Connection..."
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

    this.shaker = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 500, // optional, determines the frequency of event generation
      handler: this.onShake.bind(this)
    });

    this.socket.on("connect", () => {
      this.shaker.start();
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
    this.shaker.stop();
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
