import io from "socket.io-client";
import { Component } from "react";

import Shit from "../../components/Shit";
import Star from "../../components/Star";
import Container from "../../components/Container";
import Ship, { DIAMETER } from "../../components/Ship";

function id() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function random(min = 0, max = 100) {
  return Math.floor(Math.random() * max) + min;
}

export default class extends Component {
  static async getInitialProps({ query }) {
    const { room = "default" } = query;

    return { room };
  }

  state = {
    shits: [],
    stars: [],
    players: {}
  };

  componentDidMount() {
    const width = window.innerWidth - 500;
    const height = window.innerHeight;
    const { room } = this.props;

    this.socket = io({
      query: { room }
    });

    this.socket.on("join", this.onJoin.bind(this));
    this.socket.on("leave", this.onLeave.bind(this));
    this.socket.on("motion", this.onMotion.bind(this));

    this.setState(({ players, shits, stars }) => ({
      players,
      stars: Array(5)
        .fill(0)
        .map(() => ({
          id: id(),
          x: random(200, width),
          y: random(100, height)
        })),
      shits: Array(5)
        .fill(0)
        .map(() => ({
          id: id(),
          x: random(200, width),
          y: random(100, height)
        }))
    }));
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

  onMotion({ id, delta, angle }) {
    console.log(angle, delta);
    this.setState(state => {
      if (!state.players[id]) return state;

      const x = angle === "beta" ? delta * -1 : 0;
      const y = angle === "gamma" ? delta : 0;

      return {
        players: {
          ...state.players,
          [id]: {
            ...state.players[id],
            x: state.players[id].x + x,
            y: state.players[id].y + y
          }
        }
      };
    });
  }

  render() {
    const { stars, shits, players } = this.state;

    return (
      <Container>
        {Object.keys(players).map(id => (
          <Ship
            key={id}
            color={players[id].color}
            x={players[id].x}
            y={players[id].y}
          />
        ))}
        {shits.map(({ id, x, y }) => <Shit size={100} x={x} y={y} key={id} />)}
        {stars.map(({ id, x, y }) => <Star size={100} x={x} y={y} key={id} />)}
      </Container>
    );
  }
}
