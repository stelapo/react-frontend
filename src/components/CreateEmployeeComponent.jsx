import React, { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

function CancelButton() {
    let navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate('/employees');
    }

    return <button className='btn btn-danger' onClick={handleClick} style={{ marginLeft: "10px" }}>Cancel</button>
}

//class CreateEmployeeComponent extends Component {
function CreateEmployeeComponent(props) {
    console.debug('CreateEmployeeComponent - newEmployee=%s', props.newEmployee);
    /*console.debug('this.props.params.employeeId=%s', this.props.params.employeeId);*/

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);

    /*this.firstNameOnChangeHandler = this.firstNameOnChangeHandler.bind(this);
    this.lastNameOnChangeHandler = this.lastNameOnChangeHandler.bind(this);
    this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
    this.birthDayOnChangeHandler = this.birthDayOnChangeHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);*/


    function firstNameOnChangeHandler(event) {
        setFirstName(event.target.value);//this.setState({ firstName: event.target.value });
        //console.debug('firstName=' + this.state.firstName);
    }

    function lastNameOnChangeHandler(event) {
        setLastName(event.target.value); //this.setState({ lastName: event.target.value });
        //console.debug('lastName=' + this.state.lastName);
    }

    function emailOnChangeHandler(event) {
        setEmail(event.target.value); //this.setState({ email: event.target.value });
        //console.debug('email=' + this.state.email);
    }

    function birthDayOnChangeHandler(event) {
        setBirthday(event.target.value); // this.setState({ birthday: event.target.value });
        //console.debug('birthday=' + this.state.birthday);
    }

    function saveEmployee(event) {
        event.preventDefault();

        let employeeData = { firstName: /*this.state.*/firstName, lastName: /*this.state.*/lastName, email: /*this.state.*/email, birthday: /*this.state.*/birthday };
        console.debug(JSON.stringify(employeeData));

        EmployeeService.createEmployee(employeeData)
            .then(
                (response) => {
                    /*let logMsg = 'ERR';
                    if (response.status == 201) {
                        logMsg = 'OK';
                        let navigate = useNavigate();
                        navigate('/employees');
                    }*/
                    console.log('createEmployee response.status=%d response.data=%s', response.status, JSON.stringify(response.data));
                    setResponseStatus(response.status);
                    setResponseError(response.data); //this.setState({ responseStatus: response.status, responseError: response.data });
                }
            ).catch(
                (error) => {
                    console.error('ERROR createEmployee');
                    console.error(error);
                    setResponseStatus(500);
                    setResponseError(error); //this.setState({ responseStatus: 500, responseError: error });
                }
            ).finally(
                () => console.log('http call ended')
            )
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className='card col-md-6 offset-md-3'>
                        <h3 className="text-center">New Employee</h3>
                        {/*this.state.*/responseError && <p>{/*this.state.*/responseError.message}</p>}
                        {/*this.state.*/responseStatus && /*this.state.*/responseStatus === 201 && (
                            <Navigate to="/" replace={true} />
                        )}
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Name:</label>
                                    <input placeholder='First name' name='firstName' className='form-control'
                                        value={/*this.state.*/firstName} onChange={firstNameOnChangeHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Lastname:</label>
                                    <input placeholder='Last name' name='lastName' className='form-control'
                                        value={/*this.state.*/lastName} onChange={lastNameOnChangeHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Email:</label>
                                    <input placeholder='Email' name='email' className='form-control'
                                        value={/*this.state.*/email} onChange={emailOnChangeHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Birthday:</label>
                                    <input placeholder='Birthday' name='birthday' className='form-control'
                                        value={/*this.state.*/birthday} onChange={birthDayOnChangeHandler}></input>
                                </div>
                                <button className='btn btn-success' onClick={saveEmployee}>Save</button>
                                <CancelButton />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CreateEmployeeComponent;