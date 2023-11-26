import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Goods from './Goods';
import MyBag from './MyBag';
import Admin from './Admin';

function App() {
  return (
    <div className="App">
      
      <Link to='/'>Goods</Link>
      <Link to='/my-bag'>MyBag</Link>
      <Link to='/admin'>Admin</Link>

      <Routes>
        <Route path='/' element={<Goods/>} />
        <Route path='/my-bag' element={<MyBag/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
