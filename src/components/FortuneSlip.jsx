import React from 'react';
import './FortuneSlip.css';
import { LeftCookieHalf, RightCookieHalf } from './Cookie';

const FortuneSlip = ({ message, userName, onReset }) => {
    return (
        <div className="fortune-slip-container">
            <div className="user-name-tag">{userName}님의 운세</div>
            {/* Broken Cookie Section (Top) - Reusing the image components */}
            <div className="broken-cookie-display">
                <div className="broken-half left">
                    <div className="half-wrapper">
                        <LeftCookieHalf />
                    </div>
                </div>
                <div className="broken-half right">
                    <div className="half-wrapper">
                        <RightCookieHalf />
                    </div>
                </div>
                <div className="cookie-shadow"></div>
            </div>

            {/* Fortune Paper Section (Bottom) */}
            <div className="fortune-paper">
                <div className="fortune-header">운세</div>
                <div className="fortune-text">
                    "{userName}님의 올해는 {message}"
                </div>
                <div className="lucky-numbers">
                    행운의 숫자: {(() => {
                        const numbers = new Set();
                        while (numbers.size < 6) {
                            numbers.add(Math.floor(Math.random() * 45) + 1);
                        }
                        return Array.from(numbers).sort((a, b) => a - b).join(', ');
                    })()}
                </div>

                <button className="reset-btn" onClick={onReset}>다른 운세 뽑기</button>
            </div>
        </div>
    );
};

export default FortuneSlip;
