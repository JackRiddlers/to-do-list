import React from 'react';
import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <header>
            <nav>
                <div>
                    <img className="logos" src={logo} alt="Todo List"></img>
                </div>
            </nav>
        </header>

    )
}

export default Header
