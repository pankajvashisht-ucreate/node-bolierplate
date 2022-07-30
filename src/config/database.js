const database = {
	default: process.env.DATABASE_TYPE || "mysql",
	mysql: {
		connectionLimit: 100,
		host: process.env.HOST || "127.0.0.1",
		username: process.env.USERNAME || "root",
		password: process.env.PASSWORD || "",
		database: process.env.DATABASE || "",
		charset: "utf8mb4",
		dialect: "mysql",
	},
	url: "",
};

export default database;
