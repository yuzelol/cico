import React, { useState, useEffect } from 'react';

import '../styles/results.css'

const Results = ({setUnit, units, query}) => {

    const [list, setList] = useState([])
    const [n, setN] = useState(20)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [n])

    function handleScroll() {
        if(document.documentElement.scrollTop + window.innerHeight !== document.documentElement.offsetHeight) return
        setN(n + 20)
    }

    useEffect(() => {
        processResults()
    }, [units, query])

    function processResults() {

        if (!units.length) return;

        let unitsClone = [...units.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })]
        
        let filtered = []

        filtered = unitsClone.filter(unit => {
            let name = unit.name.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
            let q = query.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')

            if (!q) {
                return unit
            } else if (name.includes(q)) {
                return unit
            }
            return null
        })

        let groupPriority = []
        let groupAvailable = []
        let groupUnavailable = []

        filtered.forEach(unit => {
            if (unit.priority) {
                groupPriority.push(
                    <div key={unit._id}
                         property={unit.property}
                            data-name={unit.name}
                            data-available={unit.available}
                            data-priority={unit.priority}
                            data-availablesince={unit.availableSince}
                            data-completeby={unit.completeBy}
                        className="app-search-view-item priority"
                        onClick={select(unit)}>{unit.name}
                    </div>
                )
            } else if (unit.available) {
                groupAvailable.push(
                    <div key={unit._id}
                         property={unit.property}
                            data-name={unit.name}
                            data-available={unit.available}
                            data-priority={unit.priority}
                            data-availablesince={unit.availableSince}
                            data-completeby={unit.completeBy}
                        className="app-search-view-item available"
                        onClick={select(unit)}>{unit.name}
                    </div>
                )
            } else {
                groupUnavailable.push(
                    <div key={unit._id}
                         property={unit.property}
                            data-name={unit.name}
                            data-available={unit.available}
                            data-priority={unit.priority}
                            data-availablesince={unit.availableSince}
                            data-completeby={unit.completeBy}
                        className="app-search-view-item unavailable"
                        onClick={select(unit)}>{unit.name}
                    </div>
                )
            }
        })

        for (let i = 0; i < groupAvailable.length; i++) {
            for (let j = 0; j < groupPriority.length; j++) {
                if (groupAvailable[i].props.property === groupPriority[j].props.property) {
                    groupPriority.push(groupAvailable[i])
                    groupAvailable.splice(i, 1)
                    i--
                    break
                }
            }
        }

        groupPriority.sort((a, b) => {
            if (a.props.children < b.props.children) { return -1; }
            if (a.props.children > b.props.children) { return 1; }
            return 0;
        })

        if (groupPriority.length) {
            groupPriority.push(<div key='priority-available-divider' style={{ height: 28 }}></div>)
        }
        if (groupAvailable.length) {
            groupAvailable.push(<div key='available-unavailable-divider' style={{ height: 28 }}></div>)
        }

        setList(Array.prototype.concat(
            groupPriority,
            groupAvailable,
            groupUnavailable
        ))
    }

    function select(unit) {

        return () => {
            setUnit(
                {
                    data: unit,
                    note: null
                }
            )
        }
    }

    return (
            <div id="app-search-view-container" className={!units.length ? 'empty' : ''}>
                <div className="app-search-view">
                    { list.slice(0, n) }
                </div>
            </div>
    );
}

export default Results