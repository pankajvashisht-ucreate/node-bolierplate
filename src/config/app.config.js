import path from "path";
const config = {
	App_name: process.env.APP_NAME || "App_name",
	port: process.env.PORT || 4000,
	root_path: path.resolve(__dirname),
	GOOGLE_KEY: process.env.GOOGLE_KEY,
};

export default config;
