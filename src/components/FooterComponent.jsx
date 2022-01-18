import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className='footer '>
                    <span className='text-muted'>@{new Date().getFullYear()}</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;