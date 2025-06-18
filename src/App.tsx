import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Projects from './components/projects';
import Employees from './components/employees';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <div>
                    <h2>📊 Dashboard</h2>
                    <p>Ласкаво просимо до вашої інформаційної панелі!</p>
                  </div>
                }
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="/employees" element={<Employees />} />
              <Route
                path="/analytics"
                element={
                  <div>
                    <h2>📈 Analytics</h2>
                    <p>Аналізуйте дані вашої компанії.</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;