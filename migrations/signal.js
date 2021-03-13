module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Signals', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          unique: true
        },
        signal_code: {
          type: Sequelize.STRING
        },
        signal_type: {
            type: Sequelize.STRING
        },
        repeat: {
            type: Sequelize.BOOLEAN
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
      return queryInterface.dropTable('Signals');
    }
  };