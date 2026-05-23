import React from 'react';
import { Link } from "@remix-run/react";
import style from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/service">Service</Link></li>
      </ul>
    </nav>
  );
}