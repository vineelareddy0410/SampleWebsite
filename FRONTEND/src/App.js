// src/App.js

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import './App.css'; // Ensure this line is included for the CSS styles

const App = () => (
  <div>
    <Header />
    <TodoList />
    <Footer />
  </div>
);

export default App;
