import React from 'react';
import './Cookie.css';
import cookieImg from '../assets/cookie.png';

// Left Half Component (Image based)
export const LeftCookieHalf = () => (
    <div className="cookie-img-container left">
        <img src={cookieImg} alt="Cookie Left" className="cookie-img" />
    </div>
);

// Right Half Component (Image based)
export const RightCookieHalf = () => (
    <div className="cookie-img-container right">
        <img src={cookieImg} alt="Cookie Right" className="cookie-img" />
    </div>
);

const Cookie = ({ isOpen, onClick }) => {
    return (
        <div className={`cookie-3d-container ${isOpen ? 'open' : ''}`} onClick={onClick}>
            {/* Left Half */}
            <div className="cookie-half left-half">
                <LeftCookieHalf />
            </div>

            {/* Right Half */}
            <div className="cookie-half right-half">
                <RightCookieHalf />
            </div>

            <div className="shadow"></div>

            {/* Visual crumb particles */}
            {isOpen && (
                <>
                    <div className="crumb c1"></div>
                    <div className="crumb c2"></div>
                </>
            )}
        </div>
    );
};

export default Cookie;
