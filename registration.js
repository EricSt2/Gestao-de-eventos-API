const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Event = require('./event');

const Registration = sequelize.define('Registration', {
  participantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Estabelece o relacionamento (1 Evento tem VÁRIAS Inscrições / 1 Inscrição pertence a 1 Evento)
Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = Registration;