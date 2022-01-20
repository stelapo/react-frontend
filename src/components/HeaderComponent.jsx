import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div className='navbar-brand'>Employee Application</div>
                        <div>
                            <nav>
                                <Link to="/">Home</Link> |{" "}
                                <Link to="add-employee">add-employee</Link>
                            </nav>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;