import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/user.css'

const User = (props) => {

    function settings() {


        props.setModal({
            active: true,
            allowClose: true,
            title: 'User panel',
            body: (
                <div style={{height: 48}}>
                </div>
            ),
            btn:{
                color: 'red',
                text: 'Logout',
                onClick: () => {
                    window.localStorage.removeItem('user')
                    window.location.reload()
                }
            }
        })

    }

    return (
        <div id="app-user" onClick={settings}>
            <img src="/icons/user.png" style={{ width: 18, height: 18, paddingRight: 8 }} alt="User" />
            hi {props.user}
        </div>
    );
}

export default User