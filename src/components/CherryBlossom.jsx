import React, { useState } from 'react';
import './CherryBlossom.css';

const CherryBlossom = ({ isOpen, onClick }) => {
    return (
        <div className={`blossom-container ${isOpen ? 'open' : ''}`} onClick={onClick}>
            {/* The Bud/Flower */}
            <div className={`flower ${isOpen ? 'blooming' : ''}`}>
                <div className="petal p1"></div>
                <div className="petal p2"></div>
                <div className="petal p3"></div>
                <div className="petal p4"></div>
                <div className="petal p5"></div>
                <div className="center"></div>
            </div>

            <div className="shadow"></div>

            {/* Glowing magic dusts during bloom */}
            {isOpen && (
                <>
                    <div className="magic-dust d1"></div>
                    <div className="magic-dust d2"></div>
                    <div className="magic-dust d3"></div>
                </>
            )}
        </div>
    );
};

export default CherryBlossom;
