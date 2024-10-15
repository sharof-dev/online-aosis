import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Product from "./scenes/product/Product";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "./service/auth";
import { useEffect, useState } from "react";
import { getUsers } from "./slice/auth";
import Layouts from "./layouts/Layouts";
import { getItem } from "./helpers/storage";
import Edit_miniFirm from "./scenes/edit-miniFirm/Edit_miniFirm";
import Edit_Product from "./scenes/edit-product/Edit_Product";

// const Body = document.querySelectorAll('body')

// const date = new Date()
// const handleClick = (event) => {
//   console.log(event.target.textContent, date.getTime())
// }

// Body.forEach(b => {
//   b.addEventListener('click', handleClick)
// })


function App() {
  const { isLoading, loggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const iden = getItem('user_id');
  const access = getItem('access_token');

  const getUser = async () => {
    try {
      const data = await AuthService.getUser(+iden)
      console.log(data);
      dispatch(getUsers(data))
    } catch (error) {

    }
  }
  const imgD = async () => {
    try{
      const d = await AuthService.imgGet(+iden)
      console.log(d);
    }catch{}
  }
  useEffect(() => {
    imgD()
    getUser()
  }, [])

  return (
    <Routes>
      {/* {access ? ( */}
        <Route path="/" element={<Layouts />} >
          <Route index element={<Dashboard />} />
          <Route path="team" element={<Team />} />
          <Route path="company" element={<Contacts />} />
          <Route path="mini-firm" element={<Invoices />} />
          <Route path="form" element={<Form />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="product" element={<Product />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="geography" element={<Geography />} />
          <Route path="edit-mini-firm/:id" element={<Edit_miniFirm />} />
          <Route path="edit-product/:id" element={<Edit_Product />} />
        </Route>
      {/* ) : ( */}
        <Route path="/login" element={<Login />} />
      {/* )} */}

    </Routes>
  );
}

export default App;
