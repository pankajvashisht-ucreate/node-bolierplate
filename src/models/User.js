import { Model, DataTypes } from 'sequelize';
export default function (sequelize) {
	class User extends Model {
		static associate() {}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize: sequelize,
			modelName: 'User',
		},
		{
			defaultScope: {
				attributes: { exclude: ['password', 'verifyToken', 'isAdmin'] },
			},
			scopes: {
				withSecretColumns: {
					attributes: { include: ['password', 'verifyToken', 'isAdmin'] },
				},
			},
		}
	);
	return User;
}
