// src/components/UserCard.js
import React from 'react';
import { Button } from 'react-bootstrap';

const getRandomColor = (input) => {
  const colors = ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#fd7e14', '#20c997', '#198754'];
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const UserCard = ({ user, darkMode, onSelect, onEdit, onDelete }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div
      className={`card h-100 shadow ${darkMode ? 'bg-secondary text-white' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(user)}
    >
      <div className="card-body text-center">
        <div
          className="avatar mb-2 pulsing"
          style={{
            backgroundColor: getRandomColor(user.name),
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            lineHeight: '60px',
            fontSize: '24px',
            color: '#fff',
            margin: '0 auto',
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h5 className="card-title">{user.name}</h5>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Ville:</strong> {user.address?.city || user.city}</p>
        <p><strong>Téléphone:</strong> {user.phone}</p>
        <p><strong>Société:</strong> {user.company?.name || user.company}</p>
        <p><strong>Site Web:</strong> {user.website}</p>

        <div className="d-flex justify-content-around mt-2">
          <Button variant="outline-warning" onClick={(e) => { e.stopPropagation(); onEdit(user); }}>
            Modifier
          </Button>
          <Button variant="outline-danger" onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default UserCard;
