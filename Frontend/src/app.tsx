import './app.css'
import Header from './components/Header';
import FormPage from './pages/FormPage';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
      <Router>
        <Header/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<FormPage/>} />
              <Route path="/edit/:_id" element={<FormPage/>} />
          </Routes>
      </Router>
  );
};

export default App