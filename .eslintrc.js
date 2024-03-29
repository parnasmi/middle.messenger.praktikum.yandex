module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "mocha": true
    },
    plugins: [
		"@typescript-eslint"
    ],
    extends: [
        "eslint:recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": ["warn"]
    }
}
