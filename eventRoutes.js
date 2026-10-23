const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Event = require('./event');
const Registration = require('./registration');

// --- MIDDLEWARES DE VALIDAÇÃO (JOI) ---

const validateEvent = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().iso().required(),
    capacity: Joi.number().integer().min(1).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    participantName: Joi.string().required(),
    email: Joi.string().email().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// --- ROTAS DA APLICAÇÃO ---

// 1. Rota POST /events (Criar Evento no Banco)
router.post('/events', validateEvent, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 2. Rota GET /events (Listar Eventos + Contagem de Inscrições)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{ model: Registration }]
    });

    // Desafio: formata a resposta calculando o total de inscritos em cada evento
    const response = events.map(event => {
      const plainEvent = event.toJSON();
      return {
        ...plainEvent,
        totalRegistrations: plainEvent.Registrations ? plainEvent.Registrations.length : 0
      };
    });

    return res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 3. Rota POST /events/:id/register (Regra de Lotação e Inscrição)
router.post('/events/:id/register', validateRegistration, async (req, res) => {
  try {
    const eventId = req.params.id;

    // a. Busca o evento pelo ID fornecido na URL
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    // b. Conta quantas inscrições já existem para este evento
    const currentRegistrationsCount = await Registration.count({ where: { eventId } });

    // c. Verifica se a quantidade atual atingiu ou ultrapassou a capacidade do evento
    if (currentRegistrationsCount >= event.capacity) {
      return res.status(403).json({ error: 'Evento lotado! Não há vagas disponíveis.' });
    }

    // d. Se houver vaga, cria o registro da inscrição vinculada ao evento
    const newRegistration = await Registration.create({
      participantName: req.body.participantName,
      email: req.body.email,
      eventId: eventId
    });

    return res.status(201).json(newRegistration);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;