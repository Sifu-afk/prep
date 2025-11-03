import React from "react";
import { Route } from "react-router-dom";
import Layout from "../ui/components/layout/layout.jsx";
import Landing from "../ui/pages/Landing";
import Login from "../ui/pages/Login";
import Register from "../ui/pages/Register";
import Event from "../ui/pages/Event.jsx";
import Profile from "../ui/pages/Profile.jsx";

export const routes = [
  <Route key='MainLayout' path='/' element={<Layout />}>
    <Route index element={<Landing />} />
    <Route path='login' element={<Login />} />
    <Route path='register' element={<Register />} />
    <Route path='events' element={<Event />} />
    <Route path='profile' element={<Profile />} />
  </Route>,
];
