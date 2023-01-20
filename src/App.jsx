import { useState, useEffect, useRef } from "react";
import Welcome from "./components/Welcome";
import Questions from "./components/Questions";
import CheckAnswer from "./components/CheckAnswer";

function App() {
  const [isStarted, setIsStarted] = useState(true);
  const [adjustedQun, setAdjustedQun] = useState([]);
  const [noOfSelectedAnswer, setNoOfSelectedAnswer] = useState(0);
  const dataFetchedRef = useRef(false);
  const [isAllQunSelected, setIsAllQunSelected] = useState(false);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      const data = await res.json();
      adjectQuestions(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  function startGame() {
    setIsStarted((prevCount) => !prevCount);
  }

  function adjectQuestions(data) {
    let questionsArray = [];
    data.map((eachQun, index) => {
      questionsArray[index] = {
        id: index,
        question: eachQun.question,
        choices: shuffleChoices([
          ...eachQun.incorrect_answers,
          eachQun.correct_answer,
        ]),
        correctAnswer: eachQun.correct_answer,
        answerChoosed: false,
        selectedAnsText: "",
        selectedChoice: "",
      };
    });

    setAdjustedQun(questionsArray);
  }

  function shuffleChoices(choice) {
    return choice.sort(function () {
      return Math.random() - 0.4;
    });
  }

  return (
    <div className="bg-[#F5F7FB] min-h-screen relative flex justify-center items-center px-8 md:px-14 py-0">
      <div className="absolute w-20 h-32 md:w-64 md:h-56 right-0 top-0 rounded-l-full bg-[#FFFAD1] z-0 opacity-50"></div>
      <div className="absolute w-20 h-32 md:w-64 md:h-56 left-0 bottom-0 rounded-r-full bg-[#DEEBF8] z-0 opacity-50"></div>
      {isStarted ? (
        <Welcome startGame={startGame} />
      ) : !isAllQunSelected ? (
        <Questions
          questionsData={adjustedQun}
          setNoOfSelectedAnswer={setNoOfSelectedAnswer}
          noOfSelectedAnswer={noOfSelectedAnswer}
          setAdjustedQun={setAdjustedQun}
          setIsAllQunSelected={setIsAllQunSelected}
        />
      ) : (
        <CheckAnswer questionsData={adjustedQun} startGame={startGame} />
      )}
    </div>
  );
}

export default App;
