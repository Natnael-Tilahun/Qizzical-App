import React from "react";

function Welcome(props) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-[#293264]">
      <p className=" text-6xl ">Quizzical</p>
      <p className="text-lg">Test your knowledge by making a fun</p>
      <button
        className="bg-[#4D5B9E] w-48 text-white p-4 text-lg rounded-lg font-bold"
        onClick={props.startGame}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Welcome;
