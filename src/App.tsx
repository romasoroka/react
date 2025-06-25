import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Layout from './components/shared/layout';
import Projects from './pages/Projects/Projects';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Employees from './pages/Employees/Employees';
import EmployeeDetails from './pages/EmployeeDetails/EmployeeDetails'; 
import { ThemeProvider } from './components/utils/themeChange';
import DashboardPage from './pages/Dashboard/Dashboard';



const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Layout userName="Роман" isAdmin={true}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <DashboardPage/>
                }
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route
                path="/analytics"
                element={
                  <div>
                    <h2 className="text-2xl font-semibold">📈 Аналітика</h2>
                    <p>Аналізуйте дані вашої компанії.</p>
                  </div>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <DashboardPage/>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;