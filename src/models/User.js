import { Model, DataTypes } from "sequelize";
export default function (sequelize) {
	class User extends Model {
		static associate() {}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
			},
			profilePic: {
				type: DataTypes.STRING,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			verifyToken: {
				type: DataTypes.STRING,
				defaultValue: null,
			},
			isVerified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize: sequelize,
			modelName: "User",
		},
		{
			defaultScope: {
				attributes: { exclude: ["password", "verifyToken", "isAdmin"] },
			},
			scopes: {
				withSecretColumns: {
					attributes: { include: ["password", "verifyToken", "isAdmin"] },
				},
			},
		}
	);
	return User;
}
