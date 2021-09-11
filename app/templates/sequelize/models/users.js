module.exports = function (sequelize, DataTypes) {
    const { INTEGER, STRING, DATE, VIRTUAL } = DataTypes;
    const Users = sequelize.define('users', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: STRING,
            field: 'email',
            unique: {
                args: true,
                msg: 'Email must be unique',
            },
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Invalid Email',
                },
            },
        },
        firstName: {
            type: STRING,
            field: 'first_name'
        },
        lastName: {
            type: STRING,
            field: 'last_name'
        },
        fullName: {
            type: VIRTUAL,
            get: function () {
                return `${this.firstName} ${this.lastName}`;
            }
        },
        createdAt: {
            type: DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: DATE,
            field: 'deleted_at'
        }
    }, {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
        validate: {},
    });
    Users.associate = (models) => { };
    return Users;
};
