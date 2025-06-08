export const getEnvVariable = variableName => {
	const value = import.meta.env['VITE_' + variableName];

	if (typeof value === 'undefined' || value === '') {
		throw new Error(`Environment variable "${variableName}" is not defined or empty`);
	}

	return value;
};
