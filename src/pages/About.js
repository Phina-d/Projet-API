import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Container, Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaBootstrap,
  FaLaptopCode,
  FaUsersCog,
  FaGraduationCap,
  FaProjectDiagram
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const icons = [
    {
      icon: <FaReact size={50} />,
      label: 'React',
      description: 'Bibliothèque JavaScript pour créer des interfaces utilisateurs modernes.',
      link: 'https://reactjs.org/'
    },
    {
      icon: <FaBootstrap size={50} />,
      label: 'Bootstrap',
      description: 'Framework CSS utilisé pour un design responsive et rapide.',
      link: 'https://getbootstrap.com/'
    },
    {
      icon: <FaLaptopCode size={50} />,
      label: 'Développement Web',
      description: 'Création de sites et d’applications web dynamiques.',
      link: 'https://developer.mozilla.org/fr/docs/Learn'
    },
    {
      icon: <FaUsersCog size={50} />,
      label: 'Gestion Utilisateurs',
      description: 'Ajout, filtrage et gestion d’une liste d’utilisateurs.',
      link: 'https://www.digitalocean.com/community/tutorials/react-user-management-crud-app'
    },
    {
      icon: <FaGraduationCap size={50} />,
      label: 'Formation GoMyCode',
      description: 'Projet réalisé dans le cadre de la formation GoMyCode.',
      link: 'https://gomycode.com/sn/'
    },
    {
      icon: <FaProjectDiagram size={50} />,
      label: 'Projet Web',
      description: 'Projet React avec routing, composants, Bootstrap et animations.',
      link: 'https://roadmap.sh/frontend'
    }
  ];


  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setShowModal(true);
  };

  return (
    <Container className="py-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4">À propos</h1>
        <p className="lead">
          Cette application affiche une liste d’utilisateurs avec <strong>React</strong> et <strong>Bootstrap</strong>.
        </p>

        <div className="d-flex justify-content-center align-items-center gap-4 my-4 flex-wrap">
          {icons.map((item) => (
            <div
              key={item.label}
              className="about-icon"
              title={item.label}
              onClick={() => handleIconClick(item)}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <p>Elle permet de rechercher, filtrer, paginer et ajouter des utilisateurs localement.</p>
        <p>Projet réalisé dans le cadre d'une formation chez <strong>GoMyCode</strong>.</p>
      </motion.div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedIcon?.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedIcon?.description}</p>
          {selectedIcon?.link && (
            <a
              href={selectedIcon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm mt-2 d-flex align-items-center justify-content-center gap-2"
            >
              En savoir plus <FaExternalLinkAlt />
            </a>

          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default About;
