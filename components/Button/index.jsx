import Shit from "../Shit";

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Shit size={50} x={20} y={15} />
      <style jsx>
        {`
          button {
            position: relative;
            border-radius: 50%;
            background: radial-gradient(
              ellipse at center,
              red 10%,
              rgba(255, 0, 0, 0.4) 50%,
              red 90%
            );
            width: 100px;
            height: 100px;
            border: none;
            font-size: 50px;
            position: fixed;
            left: 35%;
            top: 20px;
            box-shadow: 2px -2px 0px red, 10px -5px 20px rgba(0, 0, 0, 0.4);
          }
        `}
      </style>
    </button>
  );
};

export default Button;
