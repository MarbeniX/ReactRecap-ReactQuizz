export default function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome to The React Quizz!</h2>
            <h3>{numQuestions} questions to test your mastery</h3>
            <button
                className="btn btn-start"
                onClick={() => dispatch({ type: "startQuiz" })}
            >
                Let's start
            </button>
        </div>
    );
}
