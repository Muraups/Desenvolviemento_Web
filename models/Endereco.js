const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('apinode', 'root', 'banco123', {
    host: 'localhost',
    dialect: 'mysql',
});

class Endereco extends Model { }

Endereco.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true,
        },
        logradouro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        municipioIBGE: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Endereco',
        tableName: 'enderecos',
        timestamps: true
    },
);

module.exports = Endereco;