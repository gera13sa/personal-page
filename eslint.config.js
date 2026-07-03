import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/ban-ts-comment': 'off',
			'no-shadow-restricted-names': 'error',
			'no-redeclare': 'error',

			'semi': ['warn', 'always'],
			'quotes': ['error', 'single'],
			'indent': ['error', 'tab', {SwitchCase: 1}],
			'lines-between-class-members': ['error', 'always'],
			'brace-style': ['error', '1tbs', {allowSingleLine: false}],
			'keyword-spacing': ['error', {before: true, after: true}],
			'space-infix-ops': 'error',
			'space-in-parens': ['error', 'never'],
			'array-bracket-spacing': ['error', 'never'],
			'object-curly-spacing': ['error', 'never'],
			'key-spacing': ['error', {beforeColon: false, afterColon: true}],
			'comma-spacing': ['error', {before: false, after: true}],
			'block-spacing': ['error', 'always'],
			'padded-blocks': ['error', {classes: 'always', blocks: 'never'}],

			// реакт правила
			'react-hooks/exhaustive-deps': 'off',
		},
	},
]);
