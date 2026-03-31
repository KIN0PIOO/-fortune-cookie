import React from 'react';
import './CherryBlossom.css';
import petalImg from '../assets/petal.png';

const CherryBlossom = ({ isOpen, onClick }) => {
    return (
        <div className={`petal-3d-container ${isOpen ? 'open' : ''}`} onClick={onClick}>
            {/* The Whole Petal (No splitting) */}
            <div className="petal-main">
                <img src={petalImg} alt="Petal" className="petal-img" />
            </div>

            <div className="shadow"></div>

            {/* Glowing magic particles */}
            {isOpen && (
                <>
                    <div className="petal-particle p1">🌸</div>
                    <div className="petal-particle p2">✨</div>
                </>
            )}
        </div>
    );
};

export default CherryBlossom;
