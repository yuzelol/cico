import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header'
import Main from './components/main'
import Results from './components/results'
import Modal from './components/modal'

import PropertiesService from './services/properties'

import './index.css';

const App = () => {

    const [units, setUnits] = useState([])
    const [unit, setUnit] = useState({data: null, note: null})
    const [query, setQuery] = useState('')
    const [modal, setModal] = useState({ active: false })

    useEffect(() => {
        PropertiesService.all()
            .then(response => response.data)
            .then(properties => {
                let units = []
                properties.forEach(prop => {
                    prop.units.forEach(unit => {
                        units.push(unit)
                    })
                })
                setUnits(units)
            })
    }, [])

    return (
        <div>

            <Header
                company='Property Management Company'
                title='CHECK IN / CHECK OUT APP'
                setModal={setModal}
            />

            <Main
                units={units} setUnits={setUnits}
                query={query} setQuery={setQuery}
                unit={unit} setUnit={setUnit}
                setModal={setModal}
            />
            <Results
                units={units}
                query={query}
                setUnit={setUnit}
            />
            <Modal
                modal={modal}
                setModal={setModal}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));