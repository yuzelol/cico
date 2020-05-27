import React from 'react';

// import PropertiesService from '../services/properties'

const Sync = (setModal) => {

    setModal({
        active: true,
        title: 'Synchronising...',
        body: (
            <div>
                <img src="/icons/sync.png" alt="Sync" width="18px" height="18px" className="spin" style={{ position: 'relative', top: 2, opacity: 0.5 }} />
                &ensp;Please wait...
            </div>
        )
    })

    setTimeout( () => {

        setModal({
            active: true,
            title: 'Synchronisation complete',
            body: (
                <div>
                    There are no new properties to add.
                </div>
            ),
            btn: {
                color: 'green',
                text: 'Thank you, app',
                onClick: ''
            }
        })

    }, 4000)

    // PropertiesService
    //     .sync()
    //     .then(response => {
    //         let props = []
    //         response.data.forEach(prop => props.push(prop.name))
    //         setModal({
    //             active: true,
    //             title: 'Synchronisation complete',
    //             body: (
    //                 <div>
    //                     {
    //                         response.data.length
    //                             ? <div><div>The following properties were added to the database:</div><div style={{height:8}}></div></div>
    //                             : <div>There are no new properties to add.</div>
    //                     }
    //                     {props.map(name => <div key={name}>–&ensp;{name}</div>)}
    //                 </div>
    //             ),
    //             btn: {
    //                 color: 'green',
    //                 text: 'Thank you, app',
    //                 onClick: response.data.length ? () => window.location.reload() : ''
    //             }
    //         })

    //     })

}

export default Sync