import React from "react";

const LoginModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2>Welcome! Please log in</h2>
                {/* Your login form or embed LoginRegisterPage component */}
                <p>This is your first time here. Sign in or create an account.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LoginModal;