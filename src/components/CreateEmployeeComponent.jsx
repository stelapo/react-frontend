import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";

function CancelButton() {
    let navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate('/employees');
    }

    return <button className='btn btn-danger' onClick={handleClick} style={{marginLeft: "10px"}}>Cancel</button>
}

class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            birthDay: ''
        }

        this.firstNameOnChangeHandler = this.firstNameOnChangeHandler.bind(this);
        this.lastNameOnChangeHandler = this.lastNameOnChangeHandler.bind(this);
        this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
        this.birthDayOnChangeHandler = this.birthDayOnChangeHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.cancelEmployee = this.cancelEmployee.bind(this);
    }

    firstNameOnChangeHandler = (event) => {
        this.setState({ firstName: event.target.value });
        console.log('firstName=' + this.state.firstName);
    }

    lastNameOnChangeHandler = (event) => {
        this.setState({ lastName: event.target.value });
        console.log('lastName=' + this.state.lastName);
    }

    emailOnChangeHandler = (event) => {
        this.setState({ email: event.target.value });
        console.log('email=' + this.state.email);
    }

    birthDayOnChangeHandler = (event) => {
        this.setState({ birthDay: event.target.value });
        console.log('birthDay=' + this.state.birthDay);
    }

    saveEmployee = (event) => {
        event.preventDefault();
        
        let employeeData = this.state;
        console.log(JSON.stringify(employeeData));
    }

    cancelEmployee = (event) => {
        event.preventDefault();
        console.log(event);
        let navigate = useNavigate();
        navigate('employees');
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className='card col-md-6 offset-md-3'>
                            <h3 className="text-center">New Employee</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Name:</label>
                                        <input placeholder='First name' name='firstName' className='form-control'
                                            value={this.state.firstName} onChange={this.firstNameOnChangeHandler}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Lastname:</label>
                                        <input placeholder='Last name' name='lastName' className='form-control'
                                            value={this.state.lastName} onChange={this.lastNameOnChangeHandler}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Email:</label>
                                        <input placeholder='Email' name='email' className='form-control'
                                            value={this.state.email} onChange={this.emailOnChangeHandler}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Birthday:</label>
                                        <input placeholder='Birthday' name='birthday' className='form-control'
                                            value={this.state.birthDay} onChange={this.birthDayOnChangeHandler}></input>
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                    <CancelButton/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateEmployeeComponent;