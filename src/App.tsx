import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Projects from './components/projects/Projects';
import ProjectDetails from './components/projects/ProjectDetails';
import Employees from './components/employees/Employees';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-64 md:ml-60">
            <Header />
            <main className="pt-16 p-4">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <div>
                      <h2 className="text-2xl font-bold">📊 Dashboard</h2>
                      <p>Ласкаво просимо до вашої інформаційної панелі!</p>
                    </div>
                  }
                />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/employees" element={<Employees />} />
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
  );
};

export default App;