import axios from "axios";

const EMPLOYEE_BASE_URL = "http://localhost:8080/api";

class EmployeeService {
  getEmployees() {
    return axios.get(EMPLOYEE_BASE_URL + "/v1/employees");
  }

  /*async createEmployee(employeeData) {
    const response = await axios
          .post(EMPLOYEE_BASE_URL + "/v1/employee", employeeData);
      return response.status == 201 ? "OK" : "ERR";
  }*/
  createEmployee(employeeData) {
    return axios.post(EMPLOYEE_BASE_URL + "/v1/employee", employeeData);
  }

  getEmployee(employeeId) {
    return axios.get(EMPLOYEE_BASE_URL + "/v1/employee/" + employeeId);
  }

  updateEmployee(employeeId, employeeData) {
    return axios.put(EMPLOYEE_BASE_URL + "/v1/employee/" + employeeId, employeeData);
  }
}

export default new EmployeeService();
