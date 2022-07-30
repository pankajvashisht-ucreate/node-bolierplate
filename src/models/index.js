const Sequelize = require('sequelize');
const database = require('config/database.js');
var db = {};

const sequelize = new Sequelize(database.default[database.default.default]);

let models = [require('./User'), require('./product')];

// Initialize models
models.forEach((model) => {
	const seqModel = model.default(sequelize, Sequelize);
	db[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(db).forEach((key) => {
	if ('associate' in db[key]) {
		db[key].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
