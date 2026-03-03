
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Branchlog from './pages/branchLog';
import Branchverify from './pages/branchverify';
import Location from './pages/location';
import ProtectedADMIN from './auth/authroute';
import Ownerdashboard from './pages/ownerdashboard';
import { Allorder } from './componetstoowner/allorder';
import { Pendingorder } from './componetstoowner/orderpending';
import { Tocomplete } from './componetstoowner/tocomplete';
import { OrderComplete } from './componetstoowner/ordercomplete';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Branchlog />} />
          <Route path='/verify' element={<Branchverify />} />

          <Route element={<ProtectedADMIN />}>
            <Route path='/location' element={<Location />} />
              <Route path='/' element={<Ownerdashboard />} />
              <Route path='/allorder' element={<Allorder />} />
              <Route path='/pending' element={<Pendingorder />} />
              <Route path='/process' element={<Tocomplete />} />
              <Route path='/complete' element={<OrderComplete />} /> --- IGNORE ---

          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
