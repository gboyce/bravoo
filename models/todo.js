module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },

    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'users',
        // This is the column name of the referenced model
        key: 'id'
      }
    }
    },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Todo.belongsTo(models.User, {
            foreignKey: {
              as: 'users',
              name: 'id',
              allowNull: false
            },
             onDelete: 'CASCADE'
          });
        }
      }
    }
  );
  return Todo;
};
