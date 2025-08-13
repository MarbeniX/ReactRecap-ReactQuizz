import { useEffect, useReducer } from "react";
import "./index.css";
import Header from "./quizzComponents/Header";
import Main from "./quizzComponents/Main";
import Loader from "./counterComponents/Loader";
import Error from "./counterComponents/Error";
import StartScreen from "./quizzComponents/StartScreen";
import Question from "./quizzComponents/Question";
import NextButton from "./quizzComponents/NextButton";
import Progress from "./quizzComponents/Progress";
import FinishedScreen from "./quizzComponents/FinishedScreen";

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "startQuiz":
            return { ...state, status: "start" };
        case "answered":
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case "finishQuiz":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.highscore < state.points
                        ? state.points
                        : state.highscore,
            };
        case "restartQuiz":
            return {
                ...initialState,
                questions: state.questions,
                highscore: state.highscore,
                status: "ready",
            };
        default:
            throw new Error("Unknown action type");
    }
}

export default function App() {
    const [{ questions, status, index, answer, points, highscore }, dispatch] =
        useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);

    useEffect(() => {
        async function fetchQuestion() {
            try {
                const res = await fetch("http://localhost:8000/questions");
                if (!res.ok) throw new Error();
                const data = await res.json();
                dispatch({ type: "dataReceived", payload: data });
            } catch (error) {
                dispatch({ type: "dataFailed" });
            }
        }
        fetchQuestion();
    }, []);

    return (
        <div>
            <Header />
            <Main>
                {status === "loading" && <Loader />}{" "}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "start" && (
                    <>
                        <Progress
                            points={points}
                            maxPoints={maxPoints}
                            index={index}
                            numQuestions={numQuestions}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <NextButton
                            dispatch={dispatch}
                            answer={answer}
                            index={index}
                            numQuestions={numQuestions}
                        />
                    </>
                )}
                {status === "finished" && (
                    <FinishedScreen
                        points={points}
                        maxPoints={maxPoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
