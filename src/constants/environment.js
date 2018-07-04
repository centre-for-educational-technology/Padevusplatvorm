const hostname = window && window.location && window.location.hostname;

const environment = () => {
	let api;
	let env;
	switch (hostname) {
		case 'localhost':
			api = 'http://localhost:3000/api';
			env = 'dev';
			break;
		case 'www.platform.duttiv.com':
			api = 'https://www.platform.duttiv.com/api';
			env = 'prod';
			break;
		case 'platform.duttiv.com':
			api = 'https://platform.duttiv.com/api';
			env = 'prod';
			break;
		default:
			//live
            api = 'https://platform.duttiv.com/api';
            env = 'prod';
	}
	return {
		apiUrl: api,
		env: env
	};
};

export default environment();