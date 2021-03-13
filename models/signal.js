module.exports = (sequelize, DataTypes) => {
    const Signal = sequelize.define('Signal', {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      signal_code: DataTypes.STRING,
      signal_type: DataTypes.STRING,
      repeat: DataTypes.BOOLEAN
    }, {});
    // Product.associate = function(models) {
    //   // associations can be defined here
    // };

    Signal.associate = ((models) => {
      Signal.hasOne(models.Gesture, {as: 'Signal', foreignKey: 'signal_id'})
    })
    return Signal;
  };