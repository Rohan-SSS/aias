import React from "react";
import { Home, Register, View, Roles } from "./Pages";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/view" element={<View />} />
      <Route path="/roles" element={<Roles />} />
    </Routes>
  )
}
export default App;