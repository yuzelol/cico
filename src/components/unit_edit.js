import React, { useState, useEffect } from 'react';
import unitService from '../services/unit'

import debounce from 'lodash.debounce'

import '../styles/unit.css'
import '../styles/unit_edit.css'

const ViewBlank = () => {
    return (
        <div>
            <div style={{ height: 261 }}></div>
        </div>
    )
}

const ViewAvailable = ({unit, setUnit, units, setUnits, setModal}) => {

    const [inputs, setInputs] = useState({
        tempNote: '',
        availableSince: '2020-01-01',
        completeBy: '2020-01-01'
    })

    useEffect(() => {
        setInputs({
            tempNote: unit.tempNote ? unit.tempNote : '',
            availableSince: new Date(unit.availableSince).toISOString().slice(0, 10),
            completeBy: new Date(unit.completeBy).toISOString().slice(0, 10)
        })
    }, [unit])

    function complete() {

        let textarea = document.querySelector('.app-edit-note-textarea').value.trim()

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

        const note = {
            date: new Date(),
            note: textarea,
            user: 'admin'
        }

        unitService.createNote(unit.property, unit.name, note).then(async response => {

            const change = {
                ...response.data,
                available: false,
                priority: false,
                tempNote: ''
            }

            let res = await unitService.update(unit.property, unit.name, change)

            console.log(res)

            let updatedUnits = units.filter(u => u._id !== unit._id)
            updatedUnits.push(res.data)
            
            setUnit({data: res.data, note: null})
            setUnits(updatedUnits)
        })
    }

    function markPriority() {

        const change = {
            priority: !unit.priority
        }

        unitService.update(unit.property, unit.name, change).then(res => {

            console.log(res)
            console.log('🟢 markPriority')

            let updatedUnits = units.filter(u => u._id !== unit._id)
            updatedUnits.push(res.data)
            setUnits(updatedUnits)

            setUnit({...unit, data: res.data})
        })

    }

    function availableSinceChanged(event) {
        setInputs({...inputs, availableSince: event.target.value})

        event.persist()
        if (!event.target.save) {
            event.target.save = debounce((unit, units, event) => {
                console.log('🕖 debounce')
                pushToDatabase(unit, units, event)
            }, 625);
          }
        event.target.save(unit, units, event);
    }

    function completeByChanged(event) {
        setInputs({...inputs, completeBy: event.target.value})

        event.persist()
        if (!event.target.save) {
            event.target.save = debounce((unit, units, event) => {
                console.log('🕖 debounce')
                pushToDatabase(unit, units, event)
            }, 625);
          }
        event.target.save(unit, units, event);
    }

    function textareaChanged(event) {
        setInputs({...inputs, tempNote: event.target.value})

        event.persist()
        if (!event.target.save) {
            event.target.save = debounce((unit, units, event) => {
                console.log('🕖 debounce')
                pushToDatabase(unit, units, event)
            }, 625);
          }
        event.target.save(unit, units, event);
    }

    function pushToDatabase(unit, units, event) {

        let update = {
            [event.target.id]: event.target.value
        }

        unitService.update(unit.property, unit.name, update).then(res => {

            console.log(res)
            console.log('🟢 pushToDatabase')

            let updatedUnits = units.filter(u => u._id !== unit._id)
            updatedUnits.push(res.data)
            setUnits(updatedUnits)

            setUnit({...unit, data: res.data})
        })
    }

    return (
        <div>
            <div className="app-edit-date-container">
                <div className="app-edit-input-container a">
                    <div className="a">Available since</div>
                    <input type="date"
                        id="availableSince"
                        value={inputs.availableSince}
                        onChange={availableSinceChanged}
                    />
                </div>
                <div style={{ width: 18 }}></div>
                <div className={"app-edit-input-container b " + (unit.isPriority ? 'isPriority' : '')}>
                    <div className={"b " + (unit.isPriority ? 'isPriority' : '')}>Complete by</div>
                    <input type="date"
                        id="completeBy"
                        value={inputs.completeBy}
                        onChange={completeByChanged}
                    />
                </div>
            </div>
            <div style={{ height: 20 }}></div>
            <div className="app-edit-note-container">
                <div className="app-edit-note-label">Note</div>
                <textarea className="app-edit-note-textarea"
                    id="tempNote"
                    value={inputs.tempNote}
                    onChange={textareaChanged}
                />
            </div>
            <div style={{ height: 13 }}></div>
            <div className="app-btn-container">
                <div className="app-btn green" style={{ flexBasis: 260, flexGrow: 1 }} onClick={complete}>
                    Mark as complete
                    <img src="/icons/tick.png" style={{ position: 'absolute', right: 12, width: 24, height: 24 }} alt="Complete" />
                </div>

                {/* <div style={{ width: 14 }}></div>
                <div className="app-btn blue" style={{ flexGrow: 1 }}>
                    Attach files
                <img src="/icons/pin.png" style={{ position: 'absolute', right: 12, width: 24, height: 24 }} alt="Attach files" />
                </div> */}

                <div style={{ width: 14 }}></div>
                {
                    unit.priority
                        ? <div className="app-btn blue" style={{ flexGrow: 1 }} onClick={markPriority}>
                            Unmark Priority
                        </div>
                        : <div className="app-btn red" style={{ flexGrow: 1 }} onClick={markPriority}>
                            Mark as Priority
                        </div>
                }
            </div>
            {/* <div className="app-edit-attachment-container">

            </div> */}
        </div>
    )
}

const ViewUnavailable = ({unit, setUnit, units, setUnits}) => {

    function makeAvailable() {

        // NOTE TO SELF
        // should not be responsible for implemention into state (.then())
        // unit/database service should do this (update where required)
        // would be possible with redux connect? otherwise would need service running
        // with dependancy injected, similar to angular and accessible

        const update = { available: true, availableSince: new Date() }

        unitService.update(unit.property, unit.name, update).then(res => {

            console.log(res)

            let updatedUnits = units.filter(u => u._id !== unit._id)
            updatedUnits.push(res.data)

            setUnit({...unit, data: res.data})
            setUnits(updatedUnits)
        })
    }

    return (
        <div>
            <div className="app-btn-container">
                <div className="app-btn green" style={{ width: '100%' }} onClick={makeAvailable}>
                    Make the room available
                    <img src="/icons/tick.png" style={{ position: 'absolute', right: 12, width: 24, height: 24 }} alt="Make the room available" />
                </div>
            </div>
        </div>
    )
}

const Unit_Edit = ({unit, setUnit, units, setUnits, setModal}) => {

    function name() {
        if (!unit.data) return
        if (unit.data.name.length > 33) {
            return unit.data.name.slice(0, 33).trim() + '...'
        }
        return unit.data.name
    }

    function status() {
        if (!unit.data) return
        if (unit.data.available && unit.data.priority) {
            return 'Priority'
        } else if (unit.data.available) {
            return 'Available'
        } else {
            return 'Unavailable'
        }
    }

    function agency() {
        if (!unit.data) return
        return unit.data.agency[0].toUpperCase()
    }

    return (
        <div id="app-property-unit-edit">
            <div className="app-property-unit-header">
                <div className="title">{name()}</div>
                <div className={"status " + status()}>{status()}</div>
                <div className="ext">{agency()}</div>
            </div>
            <div className="app-property-unit-body">
                {
                    !unit.data
                        ? <ViewBlank />
                        : status() === 'Priority' || status() === 'Available'
                            ? <ViewAvailable unit={unit.data} setUnit={setUnit} units={units} setUnits={setUnits} setModal={setModal} />
                            : <ViewUnavailable unit={unit.data} setUnit={setUnit} units={units} setUnits={setUnits} />
                }
            </div>
        </div>
    );
}

export default Unit_Edit