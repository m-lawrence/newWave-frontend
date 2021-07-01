import React from 'react'

function Modal ({handleModalToggle}){
    return (
        <div className="email-modal">
            <div className="email-modal-content">
                <button onClick={handleModalToggle} type="button" className="btn-close" aria-label="Close"></button>
                <div className="email-modal-header">
                    <h4 className="email-modal-title"> Contact Seller</h4>
                </div>
                
                <div className="email-modal-body">
                    <div className="input-group">
                        <span className="input-group-text">Message Content:</span>
                        <textarea className="form-control" aria-label="With textarea"></textarea>
                        </div>
                        <button onClick={handleModalToggle} className="bottom-btn">send </button>
                </div>
            </div>
        </div>
       

    )
}

export default Modal