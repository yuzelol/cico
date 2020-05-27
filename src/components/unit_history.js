import React from 'react';

import unitService from '../services/unit'

import '../styles/unit.css'
import '../styles/unit_history.css'

const ViewHistory = ({unit, setUnit}) => {

    let history = unit.data.history.sort((a, b) => new Date(b.date) - new Date(a.date))

    function select(item) {
        return () => {
            setUnit({
                ...unit,
                note: item
            })
        }
    }

    return (
        history.map(item =>
            <div className="app-history-row" key={item._id} onClick={select(item)}>
                <div className="date">{new Date(item.date).toLocaleDateString()}</div>
                <div className="text">{item.note.length > 148 ? item.note.slice(0, 148).trim() + '...' : item.note}</div>
            </div>
        )
    )
}

const ViewNote = ({unit, setUnit, units, setUnits, setModal}) => {

    function updateNote() {

        let textarea = document.querySelector('.app-note-textarea-container .app-edit-note-textarea').value.trim()
        let update = { note: textarea }

        if (!textarea) {
            setModal({
                active: true,
                title: 'Error',
                body: 'The note field is empty',
                btn: {
                    color: 'red',
                    text: 'OK',
                }
            })
            return
        }

        unitService.updateNote(unit.data.property, unit.data.name, unit.note._id, update).then(res => {
            let updatedUnits = units.filter(u => u._id !== unit.data._id)
            updatedUnits.push(res.data)

            setUnit({data: res.data, note: null})
            setUnits(updatedUnits)
        })

    }

    function deleteNote() {

        setModal({
            active: true,
            allowClose: true,
            title: 'Note',
            body: 'Are you sure you want to delete this note?',
            btn: {
                color: 'red',
                text: 'Delete',
                onClick: deleteConfirmed
            }
        })

        function deleteConfirmed() {
            unitService.deleteNote(unit.data.property, unit.data.name, unit.note._id).then(res => {
                let updatedUnits = units.filter(u => u._id !== unit.data._id)
                updatedUnits.push(res.data)
    
                setUnit({data: res.data, note: null})
                setUnits(updatedUnits)
                setModal({active: false})
            })
        }
    }

    return (
        <div className="app-note-container">

            <div className="app-note-details">
                <div className="app-note-info-container">
                    <div className="app-note-info-row">
                        <div style={{ flexBasis: 70, fontWeight: 500 }}>Date:</div>
                        <div style={{ flexGrow: 1 }}>{new Date(unit.note.date).toLocaleString()}</div>
                    </div>
                    <div style={{ height: 8 }}></div>
                    <div className="app-note-info-row">
                        <div style={{ flexBasis: 70, fontWeight: 500 }}>User:</div>
                        <div style={{ flexGrow: 1 }}>admin</div>
                    </div>
                </div>
                <div style={{ height: 18 }}></div>
                <div className="app-note-textarea-container">
                    <div className="app-edit-note-label">Note</div>
                    <textarea className="app-edit-note-textarea" style={{ height: '100%' }}
                        defaultValue={unit.note.note}
                    />
                </div>
            </div>
            <div style={{ height: 22 }}></div>
            <div className="app-note-btns">

                {/* <div className="app-btn-container">
                    <div className="app-btn blue" style={{ flexBasis: 260 }}>
                        View attachments
                    <img src="/icons/folder.png" style={{ position: 'absolute', marginTop: -1, right: 12, width: 24, height: 24 }} alt="View attachments" />
                    </div>
                    <div style={{ width: 14 }}></div>
                    <div className="app-btn blue" style={{ flexGrow: 1 }}>
                        Attach
                    <img src="/icons/pin.png" style={{ position: 'absolute', marginTop: -2, right: 12, width: 26, height: 26 }} alt="Attach files" />
                    </div>
                </div>
                <div style={{ height: 14 }}></div> */}

                <div className="app-btn-container">
                    <div className="app-btn green" style={{ flexBasis: 260 }} onClick={updateNote}>
                        Update
                    <img src="/icons/tick.png" style={{ position: 'absolute', right: 12, width: 24, height: 24 }} alt="Update" />
                    </div>
                    <div style={{ width: 14 }}></div>
                    <div className="app-btn red" style={{ flexGrow: 1 }} onClick={deleteNote}>
                        Delete
                    <img src="/icons/trash.png" style={{ position: 'absolute', right: 12, width: 24, height: 24 }} alt="Delete" />
                    </div>
                </div>

            </div>
        </div >
    )
}

const Unit_History = ({unit, setUnit, units, setUnits, setModal}) => {

    function closeNote() {
        setUnit({
            ...unit,
            note: null
        })
    }

    return (
        <div id="app-property-unit-history">
            <div className="app-property-unit-header">
                <div className="title">{unit.data ? 'History' : ''}</div>
                <div className="ext" onClick={closeNote}>{!unit.data ? '' : unit.note ? '✖' : '☰'}</div>
            </div>
            {
                unit.note
                ?   
                <ViewNote
                    unit={unit} setUnit={setUnit}
                    units={units} setUnits={setUnits}
                    setModal={setModal}
                />
                : unit.data ?
                <div className="app-history-container">
                    <ViewHistory
                        unit={unit} setUnit = {setUnit}
                    />
                </div>
                : ''
            }
        </div>
    )
}

export default Unit_History