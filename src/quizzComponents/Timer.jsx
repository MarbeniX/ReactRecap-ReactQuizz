import React, { useEffect } from "react";

export default function Timer({ dispatch, timer }) {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </div>
    );
}
