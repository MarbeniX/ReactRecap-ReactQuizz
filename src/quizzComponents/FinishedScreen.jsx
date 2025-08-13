import React from "react";

export default function FinishedScreen({
    points,
    maxPoints,
    highscore = 0,
    dispatch,
}) {
    return (
        <>
            <p className="result">
                <span>
                    You scored <strong>{points}</strong> out of {maxPoints}{" "}
                    points! ({Math.round((points / maxPoints) * 100)}%)
                </span>
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>

            <button
                className="btn"
                onClick={() => dispatch({ type: "restartQuiz" })}
            >
                Restart Quiz
            </button>
        </>
    );
}
