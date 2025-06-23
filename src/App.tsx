import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Projects from './pages/Projects/Projects';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Employees from './pages/Employees/Employees';
import EmployeeDetails from './pages/EmployeeDetails/EmployeeDetails'; 
import { ThemeProvider } from './components/utils/themeChange';

const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="flex h-screen dark:bg-gray-700 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 ml-64 md:ml-60">
              <Header />
              <main className="pt-16 p-4 ">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <div>
                        <h2 className="text-2xl font-bold ">📊 Dashboard</h2>
                        <p>Ласкаво просимо до вашої інформаційної панелі!</p>
                      </div>
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
                        <h2 className="text-2xl font-bold">📈 Analytics</h2>
                        <p>Аналізуйте дані вашої компанії.</p>
                      </div>
                    }
                  />
                </Routes>
              
              </main>
              
            </div>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;