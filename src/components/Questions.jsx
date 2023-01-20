import React from "react";
import { decode } from "html-entities";

function Qun({
  questionsData,
  noOfSelectedAnswer,
  setNoOfSelectedAnswer,
  setAdjustedQun,
  setIsAllQunSelected,
}) {
  let selectedChoiceBtn = `border-none bg-[#D6DBF5]`;

  function handleSelectedAns(e, qunNo, choiceNo) {
    if (
      questionsData[qunNo].answerChoosed &&
      questionsData[qunNo].selectedAnsText == e.target.innerText
    ) {
      setAdjustedQun((prevState) => {
        let newState = [...prevState];
        newState[qunNo].selectedAnsText = "";
        newState[qunNo].selectedChoice = "";
        newState[qunNo].answerChoosed = false;
        return newState;
      });
      setNoOfSelectedAnswer((prevState) => prevState - 1);
    } else {
      setAdjustedQun((prevState) => {
        let newState = [...prevState];
        newState[qunNo].selectedAnsText = e.target.innerText;
        newState[qunNo].selectedChoice = choiceNo;
        newState[qunNo].answerChoosed = true;
        return newState;
      });
      if (!questionsData[qunNo].answerChoosed) {
        setNoOfSelectedAnswer((prevState) => prevState + 1);
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center z-10 py-5 lg:py-20">
      {!questionsData ? (
        <h1 className="text-3xl font-bold text-[#293264]"> Loading Quiz...</h1>
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
                            q.selectedChoice == i && q.answerChoosed
                              ? selectedChoiceBtn
                              : "none"
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
            Select the remaining {5 - noOfSelectedAnswer} questions
          </p>
          <button
            className="bg-[#4D5B9E] w-48 text-white p-3 rounded-lg self-center"
            onClick={() => {
              if (noOfSelectedAnswer == 5) {
                setIsAllQunSelected((prev) => !prev);
              }
            }}
          >
            Check Answers
          </button>
        </div>
      )}
    </div>
  );
}

export default Qun;
