import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employee from './pages/Employee'
import Login from './pages/Login';
import Admin from './pages/Admin'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import List from './components/employee/List';
import AddEmployee from './components/employee/AddEmployee';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Add from './components/salary/Add';
import ViewSalary from './components/salary/ViewSalary';
import Summary from './components/EmployeeDashboard/Summary'
import LeaveList from './components/leave/LeaveList';
import AddLeave from './components/leave/AddLeave';
import Settings from './components/EmployeeDashboard/Settings';
import LeaveTable from './components/leave/LeaveTable';
import LeaveDetail from './components/leave/LeaveDetail';


function App() {

  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login/>}></Route>

        {/* Admin Routes */}
        <Route path='/admin' element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin']}>
                <Admin/>
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>
          <Route index element={<AdminSummary />}></Route>

          <Route path='/admin/departments' element={<DepartmentList />}></Route>
          <Route path='/admin/department/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin/department/:id' element={<EditDepartment />}></Route>

          <Route path='/admin/employees' element={<List />}></Route>
          <Route path='/admin/employee/add-employee' element={<AddEmployee />}></Route>
          <Route path='/admin/employees/:id' element={<View />}></Route>
          <Route path='/admin/employees/edit/:id' element={<Edit />}></Route>
          <Route path='/admin/employees/salary/:id' element={<ViewSalary />}></Route>
          
          <Route path='/admin/salary/add' element={<Add />}></Route>

          <Route path='/admin/leaves' element={<LeaveTable />}></Route>
          <Route path='/admin/leaves/details/:id' element={<LeaveDetail />}></Route>
          <Route path='/admin/employees/leaves/:id' element={<LeaveList />}></Route>

          <Route path='/admin/settings' element={<Settings />}></Route>
        </Route>

        
        {/* Employee Routes */}
        <Route path='/employee-dashboard' element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin', 'employee']}>
                <Employee />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }>
          <Route index element={<Summary/>}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/setting' element={<Settings />}></Route>
        </Route>
        {/* <Route path='/employeelist' element={<EmployeeList/>}></Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
