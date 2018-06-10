import io from "socket.io-client";
import { Component } from "react";

import Container from "../../components/Container";
import Circle, { DIAMETER } from "../../components/Circle";

export default class extends Component {
  static async getInitialProps({ query }) {
    const { room = "default" } = query;

    return { room };
  }

  state = {
    players: {}
  };

  componentDidMount() {
    const { room } = this.props;

    this.socket = io({
      query: { room }
    });

    this.socket.on("join", this.onJoin.bind(this));
    this.socket.on("leave", this.onLeave.bind(this));
    this.socket.on("shake", this.onShake.bind(this));
  }

  componentWillUnmount() {
    this.socket.close();
  }

  onJoin({ id, color }) {
    this.setState(state => ({
      players: {
        ...state.players,
        [id]: {
          id,
          color,
          y: 0,
          x: Object.keys(state.players).length * DIAMETER
        }
      }
    }));
  }

  onLeave({ id }) {
    this.setState(state => {
      const next = { players: { ...state.players } };
      delete next.players[id];
      return { ...next };
    });
  }

  onShake({ id }) {
    this.setState(state => {
      if (!state.players[id]) return state;

      return {
        players: {
          ...state.players,
          [id]: {
            ...state.players[id],
            y: state.players[id].y + DIAMETER
          }
        }
      };
    });
  }

  render() {
    const { players } = this.state;

    return (
      <Container>
        {Object.keys(players).map(id => (
          <Circle
            key={id}
            color={players[id].color}
            x={players[id].x}
            y={players[id].y}
          />
        ))}
      </Container>
    );
  }
}
