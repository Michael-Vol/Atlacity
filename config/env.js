const getEnv = (name) => {
	const unvalidatedEnv = process.env[name];
	if (!unvalidatedEnv) {
		throw new Error(`Env variable ${name} not found`);
	}
	return unvalidatedEnv;
};

export default getEnv;
