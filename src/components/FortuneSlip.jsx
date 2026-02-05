import React from 'react';
import './FortuneSlip.css';

const FortuneSlip = ({ message, onReset }) => {
    return (
        <div className="fortune-slip-container">
            <div className="fortune-paper">
                <div className="fortune-header">운세</div>
                <div className="fortune-text">
                    "{message}"
                </div>
                <div className="lucky-numbers">
                    행운의 숫자: {Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1).sort((a, b) => a - b).join(', ')}
                </div>
            </div>
            <button className="reset-btn" onClick={onReset}>다른 운세 뽑기</button>
        </div>
    );
};

export default FortuneSlip;
