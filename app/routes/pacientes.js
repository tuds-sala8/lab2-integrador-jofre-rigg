const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');

const Especialidad = require('../modelos/Especialidad');
const Medico = require('../modelos/Medico');
const Paciente = require('../modelos/Paciente');

// Obtener todos los pacientes
router.get('/', async (req, res) => {
  try {
      const pacientes = await Paciente.findAll(); // Fetch all Pacientes
      res.render('pacientes', { pacientes });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la creación de un nuevo paciente
router.post('/create', async (req, res) => {
  try {
      const { nombreCompleto, dni, contacto, obraSocial } = req.body;
      await Paciente.create({
          nombreCompleto,
          dni,
          contacto,
          obraSocial
      });
      res.redirect('/pacientes');
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la eliminación de un paciente
router.post('/delete/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Paciente.destroy({ where: { id: id } }); // Eliminar paciente por ID
      res.redirect('/pacientes');
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la búsqueda de pacientes
router.post('/buscar', async (req, res) => {
  try {
      const { nombreCompleto, dni } = req.body; // Cambiado a req.body para consistentemente manejar formularios
      const pacientes = await Paciente.findAll({
          where: {
              [Op.or]: [
                  { nombreCompleto: { [Op.like]: `%${nombreCompleto}%` } },
                  { dni: { [Op.like]: `%${dni}%` } }
              ]
          }
      });
      res.render('pacientes', { pacientes });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la búsqueda de resultados
router.post('/resultados', async (req, res) => {
  try {
      const { nombreCompleto, dni } = req.body;
      const pacientes = await Paciente.findAll({
          where: {
              [Op.or]: [
                  { nombreCompleto: { [Op.like]: `%${nombreCompleto}%` } },
                  { dni: dni }
              ]
          }
      });
      res.render('resultadosPacientes', { pacientes });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
      const paciente = await Paciente.findByPk(req.params.id); // Fetch paciente by ID
      if (!paciente) {
          return res.status(404).send('Paciente no encontrado');
      }
      res.json(paciente);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

module.exports = router;