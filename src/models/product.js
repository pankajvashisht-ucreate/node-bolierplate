'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Product.init(
		{
			image: DataTypes.STRING,
			name: DataTypes.STRING,
			createdAt: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Product',
		}
	);
	return Product;
};
