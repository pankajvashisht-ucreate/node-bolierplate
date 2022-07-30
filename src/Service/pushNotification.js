import https from "https";
import url from "url";
export const sendPush = (data) => {
	const headers = {
		Authorization: `key=${process.env.GOOGLE_KEY_USER}`,
		"Content-Type": "application/json",
	};
	const pushObject = {
		registration_ids: !Array.isArray(data.token)
			? [data.token]
			: data.token.map((val) => val.device_token),
		notification: {
			body: data.message,
			title: `${config.App_name}`,
			priority: "high",
		},
		data,
	};
	console.log(pushObject);
	POST(
		"https://fcm.googleapis.com/fcm/send",
		JSON.stringify(pushObject),
		headers
	)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

function POST(apiUrl, data, headers) {
	return new Promise((resolve, reject) => {
		const host = url.parse(apiUrl).hostname;
		const path = url.parse(apiUrl).pathname;
		const options = {
			host,
			path,
			method: "post",
			headers,
		};
		const request = https.request(options, function (res) {
			res.setEncoding("utf-8");
			let responseString = "";
			res.on("data", function (data) {
				responseString += data;
			});
			request.on("error", function (error) {
				reject(error);
			});
			res.on("end", function () {
				resolve(responseString);
			});
		});
		request.write(data);
		request.end();
	});
}
