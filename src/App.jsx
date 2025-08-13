import { useEffect, useReducer } from "react";
import "./index.css";
import Header from "./quizzComponents/Header";
import Main from "./quizzComponents/Main";
import Loader from "./counterComponents/Loader";
import Error from "./counterComponents/Error";
import StartScreen from "./quizzComponents/StartScreen";

const initialState = {
    questions: [],
    status: "loading",
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        default:
            throw new Error("Unknown action type");
    }
}

export default function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;

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
                    <StartScreen numQuestions={numQuestions} />
                )}
            </Main>
        </div>
    );
}
