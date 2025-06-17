// src/components/UserForm.js
import React from 'react';

const UserForm = ({ user, onChange, onSubmit, isEditing }) => {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <input type="text" name="name" placeholder="Nom complet" value={user.name} onChange={onChange} required className="form-control mb-2" />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={onChange} required className="form-control mb-2" />
      <input type="text" name="phone" placeholder="Téléphone" value={user.phone} onChange={onChange} className="form-control mb-2" />
      <input type="text" name="city" placeholder="Ville" value={user.city} onChange={onChange} className="form-control mb-2" />
      <input type="text" name="company" placeholder="Société" value={user.company} onChange={onChange} className="form-control mb-2" />
      <input type="text" name="website" placeholder="Site Web" value={user.website} onChange={onChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-primary">{isEditing ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
};

export default UserForm;
