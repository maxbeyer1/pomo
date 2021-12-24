import React, { useState } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ duration }) => {
    // create isPlaying state
    const [isPlaying, setIsPlaying] = React.useState(false);

    // functions for starting/stopping the timer
    const startTimer = () => {
        setIsPlaying(true);
    }
   
    const stopTimer = () => {
        setIsPlaying(false);
    }

    // use prop from timer to display remainingTime
    const renderTime = ({ remainingTime }) => {
        return (
            <div className="timer">
                <div className="remainingTime">
                    <div className="value">{remainingTime}</div>
                </div>
                <div className="playpause-wrapper">
                    {isPlaying ? (
                        <button type="button" onClick={stopTimer}>
                            Pause
                        </button>
                    ) : (
                        <button type="button" onClick={startTimer}>
                            Start
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="timer-wrapper">
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={10}
            colors={[
              ['#FB8484', 1],
            ]}
          >
            {renderTime}
        </CountdownCircleTimer>
      </div>
    )
}

export default Timer;