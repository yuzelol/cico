import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './modal'

import Sync from '../actions/sync'
import Print from '../actions/print'

import '../styles/header.css'

const Header = (props) => {

    return (
        <header>
            <div className="app-header-company">{props.company}</div>
            <div className="app-header-location">
                <div className="app-header-title">{props.title}</div>
                <div className="app-header-icon-container">
                    <div className="app-header-icon">
                        <img src="/icons/print.png" alt="Print" width="32px" height="32px" onClick={() => Print()} />
                    </div>
                    <div className="app-header-icon">
                        <img src="/icons/sync.png" alt="Sync" width="35px" height="35px" onClick={() => Sync(props.setModal)} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header