const Sequelize = require('sequelize')
const connection = require('../Controller/database/database')

const User = require('./User')

const Data = connection.define('datas', {

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    tipo: { // entrada ou saida
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }

})

User.hasMany(Data)

Data.belongsTo(User)

// Data.sync( {force: true} )

module.exports = Data