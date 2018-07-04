const hostname = window && window.location && window.location.hostname;

const environment = () => {
	let api;
	let env;
	switch (hostname) {
		case 'localhost':
			api = 'http://localhost:3000/api';
			env = 'dev';
			break;
		case 'test.ddcmp.com':
			api = 'http://test.ddcmp.com/api';
			env = 'prod';
			break;
		case 'ddcmp.com':
			api = 'https://ddcmp.com/api';
			env = 'prod';
			break;
		default:
			//live
			api = 'https://www.ddcmp.com/api';
			env = 'prod';
	}
	return {
		apiUrl: api,
		env: env
	};
};

export default environment();