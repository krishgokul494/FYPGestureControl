module.exports = (sequelize, DataTypes) => {
    const Gesture = sequelize.define('Gesture', {
        name: {
            type: DataTypes.STRING
        },
        signal_id: {
            type: DataTypes.INTEGER,
            refs: {
				model: 'Signals',
				key: 'id'
			}
        }
    }, {})

    Gesture.associate = (models) => {
        Gesture.belongsTo(models.Signal, {as: 'Signal', foreignKey: 'signal_id'})
    }

    return Gesture;
}