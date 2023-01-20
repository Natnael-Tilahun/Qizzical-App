import React from "react";
import { decode } from "html-entities";

function CheckAnswer({ questionsData, startGame }) {
  let corretChoiceBtn = `border-none bg-[#94D7A2] opacity-100`;
  let inCorrectChoiceBtn = `border-none bg-[#F8BCBC]`;
  let otherChoiceBtn = `border-[#293264] text-[#293264] opacity-50`;

  let corrAns = 0;

  const setNoOfCorrectAnsHandler = () => {
    corrAns = corrAns + 1;
    return corretChoiceBtn;
  };

  const playAgainHandler = () => {
    location.reload();
  };

  return (
    <div className="min-h-screen flex justify-center items-center z-10 py-5 lg:py-20">
      {!questionsData ? (
        <h1 className="text-3xl font-bold text-[#293264]">
          {" "}
          Checking Answers...
        </h1>
      ) : (
        <div className="flex flex-col">
          {questionsData.map((q, questionIndex) => {
            return (
              <div key={questionIndex}>
                <p className="text-[#293264] text-lg md:text-xl font-black">
                  {decode(q.question)}
                </p>

                <div className="flex py-5 flex-wrap gap-4 lg:gap-10">
                  {q.choices.map((c, i) => (
                    <div key={i}>
                      <button
                        className={`border-[#4D5B9E] border-2 min-w-[90px] py-1 px-2 rounded-lg md:rounded-xl text-[#293264] text-sm bg-none
                          ${
                            q.selectedChoice == i &&
                            q.selectedAnsText == q.correctAnswer
                              ? setNoOfCorrectAnsHandler()
                              : q.selectedChoice == i &&
                                q.selectedAnsText != q.correctAnswer
                              ? inCorrectChoiceBtn
                              : "none"
                          }

                          ${
                            q.selectedAnsText != q.correctAnswer &&
                            c == q.correctAnswer
                              ? corretChoiceBtn
                              : otherChoiceBtn
                          }
                        `}
                        onClick={(e) => handleSelectedAns(e, questionIndex, i)}
                      >
                        {decode(c)}
                      </button>
                    </div>
                  ))}
                </div>
                <hr className="border-[#DBDEF0] h-6" />
              </div>
            );
          })}

          <p className="text-[#293264] text-center my-5">
            You scored {corrAns}/ 5 correct answers
          </p>
          <button
            className="bg-[#4D5B9E] w-48 text-white p-3 rounded-lg self-center"
            onClick={playAgainHandler}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckAnswer;
