import React from "react";

export default function Question({ question, dispatch, answer }) {
    const alreadyAnswered = answer !== null;
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        className={`btn btn-option ${
                            answer === index ? "answer" : ""
                        } ${
                            alreadyAnswered
                                ? index === question.correctOption
                                    ? "correct"
                                    : "wrong"
                                : ""
                        }`}
                        onClick={() =>
                            dispatch({ type: "answered", payload: index })
                        }
                        disabled={alreadyAnswered}
                        key={option}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
