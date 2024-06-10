// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || '',
    lastname: localStorage.getItem('lastname') || '',
    secondLastname: localStorage.getItem('secondlastname') || '',
    email: localStorage.getItem('email') || ''
  });

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('username', newUserData.username);
    localStorage.setItem('lastname', newUserData.lastname);
    localStorage.setItem('secondlastname', newUserData.secondLastname);
    localStorage.setItem('email', newUserData.email);
  };

  useEffect(() => {
    setUser({
      username: localStorage.getItem('username') || '',
      lastname: localStorage.getItem('lastname') || '',
      secondLastname: localStorage.getItem('secondlastname') || '',
      email: localStorage.getItem('email') || ''
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
