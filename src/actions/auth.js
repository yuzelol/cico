import React from 'react';

import LoginService from '../services/login'

const Auth = (storedUser, setUser, setModal) => {

    if(storedUser) return

    const sendCredentials = async (e) => {
        e.preventDefault()

        let username = e.target.username.value
        let password = e.target.password.value

        try {
            const activeUser = await LoginService.login({ username, password })
            window.localStorage.setItem('user', JSON.stringify(activeUser))
            setUser(activeUser)
            setModal({ active: false })
        } catch (err) {
            document.querySelector('#app-login-form [name=username]').value = ''
            document.querySelector('#app-login-form [name=password]').value = ''
            document.querySelector('.app-btn-info').innerHTML = 'Wrong credentials'
            document.querySelector('.app-btn-info').classList.add('red')
            document.querySelector('#app-login-form [name=username]').focus()
        }


    }

    setModal({
        active: true,
        title: 'Welcome',
        body: (
            <form id="app-login-form" onSubmit={sendCredentials}>
                <div style={{paddingTop: 2}}>
                    <div>
                        <input type="text" placeholder="Username" name="username" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" name="password" />
                    </div>
                </div>
                <div style={{ height: 14 }}></div>
                <div>
                    <div className="app-btn-container">
                        <div className="app-btn-info">
                        </div>
                        <div style={{ width: 14 }}></div>
                        <input style={{ justifyContent: 'center', padding: '0 20px', width: '120px' }} className="app-btn green" type="submit" value="Login" />
                    </div>
                </div>
            </form>
        )
    })
}

export default Auth