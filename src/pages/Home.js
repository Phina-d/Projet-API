import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import Pagination from '../components/Pagination';

function Home({ darkMode, setDarkMode }) {
  const [listOfUser, setListOfUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    company: '',
    website: '',
  });

  const usersPerPage = 6;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUser(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  }, []);

  useEffect(() => {
    const results = listOfUser.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, listOfUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditUser = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedList = listOfUser.map((user) =>
        user.id === editingUserId ? {
          ...user,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: { city: newUser.city },
          company: { name: newUser.company },
          website: newUser.website
        } : user
      );
      setListOfUser(updatedList);
      setFilteredUsers(updatedList);
      setEditMode(false);
      setEditingUserId(null);
      alert('Utilisateur modifié avec succès !');
    } else {
      const addedUser = {
        id: listOfUser.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: { city: newUser.city },
        company: { name: newUser.company },
        website: newUser.website,
      };
      const updatedList = [...listOfUser, addedUser];
      setListOfUser(updatedList);
      setFilteredUsers(updatedList);
      alert('Utilisateur ajouté avec succès !');
    }

    setShowForm(false);
    setNewUser({ name: '', email: '', phone: '', city: '', company: '', website: '' });
  };

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditingUserId(user.id);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address?.city || user.city,
      company: user.company?.name || user.company,
      website: user.website,
    });
    setShowForm(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      const updatedList = listOfUser.filter((user) => user.id !== id);
      setListOfUser(updatedList);
      setFilteredUsers(updatedList);
    }
  };

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const changePage = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1>Liste des Utilisateurs</h1>
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={`btn btn-${darkMode ? 'light' : 'dark'}`} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className={`btn btn-${darkMode ? 'light' : 'dark'}`} onClick={() => {
            setShowForm(!showForm);
            setEditMode(false);
            setNewUser({ name: '', email: '', phone: '', city: '', company: '', website: '' });
          }}>
            {showForm ? 'Annuler' : 'Ajouter un utilisateur'}
          </button>
        </div>
      </div>

      {showForm && (
        <UserForm
          user={newUser}
          onChange={handleInputChange}
          onSubmit={handleAddOrEditUser}
          isEditing={editMode}
        />
      )}

      <div className="row">
        {currentUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            darkMode={darkMode}
            onSelect={setSelectedUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
          darkMode={darkMode}
        />
      )}

      <Modal show={selectedUser !== null} onHide={() => setSelectedUser(null)} centered>
        <Modal.Header closeButton className={darkMode ? 'bg-dark text-white' : ''}>
          <Modal.Title>Détails de {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-dark text-white' : ''}>
          {selectedUser && (
            <div>
              <p><strong>Nom :</strong> {selectedUser.name}</p>
              <p><strong>Email :</strong> {selectedUser.email}</p>
              <p><strong>Téléphone :</strong> {selectedUser.phone}</p>
              <p><strong>Adresse :</strong> {selectedUser.address?.street || ''}, {selectedUser.address?.city || selectedUser.city}</p>
              <p><strong>Société :</strong> {selectedUser.company?.name || selectedUser.company}</p>
              <p><strong>Site Web :</strong> {selectedUser.website}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-dark text-white' : ''}>
          <Button variant="secondary" onClick={() => setSelectedUser(null)}>Fermer</Button>
        </Modal.Footer>
      </Modal>

      {filteredUsers.length === 0 && (
        <p className="text-center mt-4">Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
}

export default Home;
