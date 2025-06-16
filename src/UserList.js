// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUser(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Liste des utilisateurs</h2>
      <ul className="list-group">
        {listOfUser.map((user) => (
          <li key={user.id} className="list-group-item">
            <strong>{user.name}</strong> - {user.email}
            <br />
            <small>{user.address.city}, {user.address.street}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
