import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
    
          <div className="container">
            <Routes>
              <Route path='/' exact element={<ListEmployeeComponent/>}></Route>
              <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
              <Route path='/add-employee' element={<CreateEmployeeComponent newEmployee="true"/>}></Route>
              <Route path='/edit-employee/:employeeId' element={<CreateEmployeeComponent newEmployee="false"/>}></Route>
            </Routes>
          </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
