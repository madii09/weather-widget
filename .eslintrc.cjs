module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:@typescript-eslint/recommended-type-checked', // use for strict type check: 'plugin:@typescript-eslint/strict-type-checked'
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:react-hooks/recommended',
		// This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
		// Make sure it's always the last config, so it gets the chance to override other configs.
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh', 'simple-import-sort'],
	rules: {
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',

		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react-hooks/exhaustive-deps': 'error',

		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['**/*.js', '**/*.ts', '**/*.tsx'],
						message: 'Omit file extensions when importing modules.',
					},
				],
			},
		],
	},
};
