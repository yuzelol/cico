import React from 'react';

import SearchBar from './searchBar'
import UnitView from './unitView'

import '../styles/main.css'

const Main = (props) => {
    return (
        <main>
            <SearchBar
                query={props.query} setQuery={props.setQuery}
            />
            <div className="app-vert-divider-28"></div>
            <UnitView
                unit={props.unit} setUnit={props.setUnit}
                units={props.units} setUnits={props.setUnits}
                setModal={props.setModal}
            />
        </main>
    );  
}

export default Main