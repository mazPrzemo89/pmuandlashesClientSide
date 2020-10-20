import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signin/Signin'
import Home from './Components/Home/Home'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from "./Components/UserDashboard/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ManageBookings from "./Components/ManageBookings/ManageBookings";
import AddCategory from "./Components/Category&Product/Category/AddCategory";
import AddProduct from "./Components/Category&Product/Product/AddProduct";
import Calendar from './Components/Calendar/Calendar'
import Products from "./Components/Category&Product/Products/Products";
import Testimonial from './Components/Testimonial/Testimonial'
import TimeSheet from './Components/TimeSheet/TimeSheet'
import About from './Components/About/About'
import Promotions from "./Components/Promotions/Promotions";
import Success from './Components/Success/Success'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/testimonial" exact component={Testimonial} />
                <Route path="/promotions" exact component={Promotions} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/calendar" exact component={Calendar} />
                <Route path="/products" exact component={Products} />
                <Route path="/success" exact component={Success} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/times" exact component={TimeSheet} />
                <AdminRoute path="/admin/bookings" exact component={ManageBookings} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <Route path="/*" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes