import React from 'react';

import { default as Edit } from './unit_edit'
import { default as History } from './unit_history'

import '../styles/actionView.css'

const UnitView = (props) => {
    return (
        <div id="app-action-container">
            <div id="app-property-unit-container">
                <Edit
                    unit={props.unit} setUnit={props.setUnit}
                    units={props.units} setUnits={props.setUnits}
                    setModal={props.setModal}
                />
                <div className="app-horz-divider-28"></div>
                <History
                    unit={props.unit} setUnit={props.setUnit}
                    units={props.units} setUnits={props.setUnits}
                    setModal={props.setModal}
                />
            </div> 
        </div>
    );
}

export default UnitView