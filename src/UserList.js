// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard'; // Vérifie le chemin selon ton projet
import { Container, Row } from 'react-bootstrap';

const UserList = ({ darkMode }) => {
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
    <Container className="mt-4">
      <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
        Liste des utilisateurs
      </h2>
      <Row>
        {listOfUser.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            darkMode={darkMode}
            onSelect={() => console.log('Utilisateur sélectionné :', user.name)}
            onEdit={() => alert(`Modifier ${user.name}`)}
            onDelete={() => alert(`Supprimer ID : ${user.id}`)}
          />
        ))}
      </Row>
    </Container>
  );
};

export default UserList;
