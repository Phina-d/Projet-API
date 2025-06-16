import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { FaLaptopCode } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

// En haut de ton fichier Home.js
const getRandomColor = (input) => {
  const colors = ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#fd7e14', '#20c997', '#198754'];
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};


function Home({ darkMode, setDarkMode }) {
  const [listOfUser, setListOfUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    company: '',
    website: '',
  });

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
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
      setShowForm(false);
      setNewUser({ name: '', email: '', phone: '', city: '', company: '', website: '' });
      alert('Utilisateur ajouté avec succès (local) !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('Erreur lors de l\'ajout');
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
          <button className={`btn btn-${darkMode ? 'light' : 'dark'}`} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Annuler' : 'Ajouter un utilisateur'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="mb-4">
          <input type="text" name="name" placeholder="Nom complet" value={newUser.name} onChange={handleInputChange} required className="form-control mb-2" />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required className="form-control mb-2" />
          <input type="text" name="phone" placeholder="Téléphone" value={newUser.phone} onChange={handleInputChange} className="form-control mb-2" />
          <input type="text" name="city" placeholder="Ville" value={newUser.city} onChange={handleInputChange} className="form-control mb-2" />
          <input type="text" name="company" placeholder="Société" value={newUser.company} onChange={handleInputChange} className="form-control mb-2" />
          <input type="text" name="website" placeholder="Site Web" value={newUser.website} onChange={handleInputChange} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
      )}

      <div className="row">
        {currentUsers.map((user) => (
         <div className="col-md-6 col-lg-4 mb-4" key={user.id}>
  <div
    className={`card h-100 shadow user-card ${darkMode ? 'bg-secondary text-white' : ''}`}
    onClick={() => setSelectedUser(user)}
    style={{ cursor: 'pointer' }}
  >
    <div className="card-body d-flex flex-column align-items-center text-center">
      <div
        className="avatar mb-2 pulsing"
        style={{
          backgroundColor: getRandomColor(user.name),
          color: darkMode ? 'black' : 'white',
        }}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>
      <h5 className="card-title">{user.name}</h5>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Ville :</strong> {user.address?.city || user.city}</p>
      <p><strong>Téléphone :</strong> {user.phone}</p>
      <p><strong>Société :</strong> {user.company?.name || user.company}</p>
      <p><strong>Site Web :</strong> {user.website}</p>
    </div>
  </div>
</div>


        ))}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Button variant={darkMode ? 'outline-light' : 'outline-dark'} className="me-2" onClick={() => changePage('prev')} disabled={currentPage === 1}>
            Précédent
          </Button>
          <span className="align-self-center">Page {currentPage} / {totalPages}</span>
          <Button variant={darkMode ? 'outline-light' : 'outline-dark'} className="ms-2" onClick={() => changePage('next')} disabled={currentPage === totalPages}>
            Suivant
          </Button>
        </div>
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
