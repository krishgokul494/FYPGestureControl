module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Gesturess', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        signal_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'signal',
                key: 'id'
            }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Gestures');
    }
  };