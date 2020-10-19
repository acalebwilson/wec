import React from 'react'
import Login from './login'

class LoginPage extends React.Component {
    render() {
        return (
            <div className="admin-area-wrapper">
                <div className="admin-area login">
                    <Login />
                </div>
            </div>
        )
    }
}

export default LoginPage