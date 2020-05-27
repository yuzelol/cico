import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/modal.css'

const Modal = (props) => {

    if (!props.modal.active) return (<></>)

    function closeModal() {
        console.log('standard close')
        props.setModal({
            active: false
        })
    }

    return (
        <div id="app-disabled">
            <div id="app-modal">
                <div className="app-header-std">
                    <div className="title">{props.modal.title}</div>
                    {props.modal.allowClose ? <div className="ext" onClick={closeModal}>✖</div> : ''}
                </div>
                <div className="app-body-std">
                    <div>
                        {props.modal.body}
                    </div>


                    {'btn' in props.modal
                        ? <div>
                            <div style={{ height: 14 }}></div>
                            <div className="app-btn-container">
                                <div className={"app-btn-info " + ('info' in props.modal ? props.modal.info.color : '')}>
                                    {'info' in props.modal ? props.modal.info.text : ''}
                                </div>
                                <div style={{ width: 14 }}></div>
                                {
                                    'btn' in props.modal
                                        ? <div
                                            className={"app-btn " + (props.modal.btn.color)}
                                            onClick={props.modal.btn.onClick || closeModal}>
                                            {props.modal.btn.text}
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>
                        : ''
                    }


                </div>
            </div>
        </div>
    )
}

export default Modal