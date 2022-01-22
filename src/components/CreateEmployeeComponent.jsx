import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation, useParams } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';
import ErrMsgComponent from './messages/ErrMsgComponent';

function CancelButton() {
    let navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate('/employees');
    }

    return <button className='btn btn-danger' onClick={handleClick} style={{ marginLeft: "10px" }}>Cancel</button>
}

function CreateEmployeeComponent(props) {
    console.debug('CreateEmployeeComponent - newEmployee=%s', props.newEmployee);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [createResponseError, setCreateResponseError] = useState(null);
    const [createResponseStatus, setCreateResponseStatus] = useState(null);
    const [newEmployee] = useState(props.newEmployee === 'true');
    const [loadingError, setLoadingError] = useState('');

    let location = useLocation();
    console.debug(location);

    let { employeeId } = useParams();
    console.debug('employeeId=%s', employeeId);

    useEffect(() => {
        if (!newEmployee) {
            EmployeeService.getEmployee(employeeId)
                .then(
                    (response) => {
                        if (response.status === 200) {
                            setFirstName(response.data.firstName);
                            setLastName(response.data.lastName);
                            setEmail(response.data.email);
                            setBirthday(response.data.birthday);
                        } else {
                            const err = 'Error retriving data! ' + response.data;
                            console.error(err);
                            setLoadingError(err);
                        }
                    }
                ).catch(
                    (error) => {
                        const err = 'Error retriving data! ' + error.message;
                        console.error(err + ' - ' + JSON.stringify(error));
                        setLoadingError(err);
                    }
                );
        }
      }, []);

    
    function firstNameOnChangeHandler(event) {
        setFirstName(event.target.value);
    }

    function lastNameOnChangeHandler(event) {
        setLastName(event.target.value);
    }

    function emailOnChangeHandler(event) {
        setEmail(event.target.value);
    }

    function birthDayOnChangeHandler(event) {
        setBirthday(event.target.value);
    }

    function saveEmployee(event) {
        event.preventDefault();

        let employeeData = { firstName: firstName, lastName: lastName, email: email, birthday: birthday };
        console.debug(JSON.stringify(employeeData));

        let handlerResponse = (response) => {
            console.debug('createEmployee response.status=%d response.data=%s', response.status, JSON.stringify(response.data));
            setCreateResponseStatus(response.status);
            setCreateResponseError(response.data);
        };

        let handlerError = (error) => {
            console.error('ERROR createEmployee');
            console.error(error);
            setCreateResponseStatus(500);
            setCreateResponseError(error);
        };

        let handlerFinally = () => console.debug('http call ended');

        if (newEmployee) {
            EmployeeService.createEmployee(employeeData)
                .then(handlerResponse)
                .catch(handlerError)
                .finally(handlerFinally);
        } else {
            EmployeeService.updateEmployee(employeeId, employeeData)
                .then(handlerResponse)
                .catch(handlerError)
                .finally(handlerFinally);
        }
    }

    let mainDiv;
    if (loadingError) {
        mainDiv = (
            <div className='card col-md-6 offset-md-3'>
                <div className="row">
                    <ErrMsgComponent msg={loadingError} />
                </div>
                <div className="row">
                    <CancelButton />
                </div>
            </div>
        );
    } else {
        mainDiv = (
            <div className="row">
                <div className='card col-md-6 offset-md-3'>
                    <h3 className="text-center">{(newEmployee) ? 'New' : 'Edit'} Employee</h3>
                    {createResponseError && <p>{createResponseError.message}</p>}
                    {createResponseStatus && createResponseStatus === 201 && (
                        <Navigate to="/" replace={true} />
                    )}
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>Name:</label>
                                <input placeholder='First name' name='firstName' className='form-control'
                                    value={firstName} onChange={firstNameOnChangeHandler}></input>
                            </div>
                            <div className='form-group'>
                                <label>Lastname:</label>
                                <input placeholder='Last name' name='lastName' className='form-control'
                                    value={lastName} onChange={lastNameOnChangeHandler}></input>
                            </div>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input placeholder='Email' name='email' className='form-control'
                                    value={email} onChange={emailOnChangeHandler}></input>
                            </div>
                            <div className='form-group'>
                                <label>Birthday:</label>
                                <input placeholder='Birthday' name='birthday' className='form-control'
                                    value={birthday} onChange={birthDayOnChangeHandler}></input>
                            </div>
                            <button className='btn btn-success' onClick={saveEmployee}>Save</button>
                            <CancelButton />
                        </form>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div>
            <div className="container">
                {mainDiv}
            </div>
        </div>
    );

}

export default CreateEmployeeComponent;