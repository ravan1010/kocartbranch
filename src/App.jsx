
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Branchlog from './pages/branchLog';
import Branchverify from './pages/branchverify';
import Location from './pages/location';
import ProtectedADMIN from './auth/authroute';
import Ownerdashboard from './pages/ownerdashboard';
import { Allorder } from './componetstoowner/allorder';
import { Pendingorder } from './componetstoowner/orderpending';
import { Deliveredorder } from './componetstoowner/ordercomplete';
import { Acceptedorder } from './componetstoowner/accept';
import { Assignedorder } from './componetstoowner/assign';
import { Pickuporder } from './componetstoowner/pickup';
import { Cancelledorder } from './componetstoowner/ordercancel';
import MerchantList from './pages/marchentData';
import Posts from './pages/posts';
import MerchantSettlement from './pages/paymentsetttlement';


function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Branchlog />} />
          <Route path='/branch-auth-success' element={<Branchverify />} />

          <Route element={<ProtectedADMIN />}>
            <Route path='/location' element={<Location />} />
              <Route path='/' element={<Ownerdashboard />} />
              <Route path='/marchent/data' element={<MerchantList />} />
              <Route path='/posts' element={<Posts /> } />
              <Route path="/paymentsettlement" element={<MerchantSettlement />}/>
              <Route path='/allorder' element={<Allorder />} />
              <Route path='/pending' element={<Pendingorder />} />
              <Route path='/accept' element={<Acceptedorder />} />
              <Route path='/assign' element={<Assignedorder />} /> --- IGNORE ---
              <Route path='/pickup' element={<Pickuporder />} />
              <Route path='/delivered' element={<Deliveredorder />} />
              <Route path='/cancelled' element={<Cancelledorder />} /> --- IGNORE ---
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
