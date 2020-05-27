import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import '../styles/dev.css'

import PropertiesService from '../services/properties'

function get() {

    PropertiesService
        .all()
        .then(response => console.log(response.data))

}

const Dev = () => {
    return (
        <div id="dev">
            <button onClick={get}>get all props</button>
        </div>
    )
}

export default Dev