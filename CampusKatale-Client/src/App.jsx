import {Routes, Route,} from "react-router-dom";

function App(){
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/marketplace" element={<Marketplace/>}/>
  </Routes>
}

export default App;