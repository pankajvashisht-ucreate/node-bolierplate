export default {
	default: process.env.SMS || "twillo",
	twillo: {
		accountSid: process.env.SID || "",
		authToken: process.env.AUTHTOKENSMS || "",
		sendNumber: process.env.SENDERNUMBER || "",
	},
};
