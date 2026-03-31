import React from 'react';
import './FortuneSlip.css';

const FortuneSlip = ({ message, userName, onReset }) => {
    return (
        <div className="fortune-slip-container">
            {/* Sakura decorative elements */}
            <div className="sakura-decor top-left">🌸</div>
            <div className="sakura-decor top-right">🌸</div>
            
            <div className="user-name-tag">{userName}님의 행운의 편지</div>

            {/* Fortune Paper Section (Main Reveal) */}
            <div className="fortune-paper">
                <div className="fortune-header">올해의 행운</div>
                <div className="fortune-text">
                    "{userName}님의 찾아올 봄날에는,<br/> {message}"
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
                
                {/* Visual decorations for the paper */}
                <div className="paper-decor bottom-left"></div>
                <div className="paper-decor bottom-right"></div>
            </div>
            
            <button className="reset-btn" onClick={onReset}>다른 행운 꽃피우기</button>
        </div>
    );
};

export default FortuneSlip;
