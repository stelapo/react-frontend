import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from "react-router-dom";

function Button() {
    let navigate = useNavigate();

    function handleClick(e) {
        navigate('/add-employee');
    }

    return <button className='btn btn-primary' onClick={handleClick}>Add employee</button>
}

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then(
            axiosResponse => this.setState({ employees: axiosResponse.data })
        ).catch(
            error => console.error(error)
        );
    }

    render() {

        return (
            <div>
                <div className='row'>
                    <Button />
                </div>
                <h2 className='text-center'>Employees List</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>
                                    First name
                                </th>
                                <th>
                                    Last name
                                </th>
                                <th>
                                    Email Id
                                </th>
                                <th>
                                    Birthday
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>
                                                {employee.firstName}
                                            </td>
                                            <td>
                                                {employee.lastName}
                                            </td>
                                            <td>
                                                {employee.email}
                                            </td>
                                            <td>
                                                {employee.birthday}
                                            </td>
                                            <td>
                                                {/*employee.actions */}
                                            </td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;