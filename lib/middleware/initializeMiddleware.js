export default function initializeMiddleware(middleware) {
	return (req, res) => {
		return new Promise((resolve, reject) => {
			middleware(req, res, (result) => {
				if (result instanceof Error) {
					return reject(result);
				}
				return resolve(result);
			});
		});
	};
}
