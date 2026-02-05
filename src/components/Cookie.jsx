import React from 'react';
import './Cookie.css';

const Cookie = ({ isOpen, onClick }) => {
    return (
        <div className={`cookie-3d-container ${isOpen ? 'open' : ''}`} onClick={onClick}>
            <div className="cookie-body left-half">
                <div className="cookie-surface"></div>
                <div className="cookie-edge"></div>
            </div>
            <div className="cookie-body right-half">
                <div className="cookie-surface"></div>
                <div className="cookie-edge"></div>
            </div>
            <div className="shadow"></div>

            {/* Visual crumb particles for effect */}
            {isOpen && (
                <>
                    <div className="crumb c1"></div>
                    <div className="crumb c2"></div>
                    <div className="crumb c3"></div>
                </>
            )}
        </div>
    );
};

export default Cookie;
