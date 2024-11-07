// models/Agenda.js
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
class Agenda extends Model {}

// Definición del modelo
Agenda.init({
  id_agenda: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clasificacion: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  disponible_desde: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  disponible_hasta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  medico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos', // Nombre de la tabla de referencia
      key: 'id_medico', // Llave primaria en la tabla de referencia
    },
  },
}, {
  sequelize, 
  modelName: 'Agenda',
  tableName: 'agendas',
  timestamps: false, 
});




  // Relación con el modelo Medico
  Agenda.associate = (models) => {
      Agenda.belongsTo(models.Medico, {
          foreignKey: 'medico_id',
          targetKey: 'id_medico',
      });
      Agenda.hasMany(models.Turno, {
          foreignKey: 'agenda_id',
          sourceKey: 'id_agenda',
      });
  };

  return Agenda;
};
