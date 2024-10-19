import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Summary from './components/Summary/Summary';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path='/summary' exact element={<Summary/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App