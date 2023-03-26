install:
	npm ci

install-eslint-packages:
	npm install eslint
	npm install eslint-config-airbnb-base
	npm install eslint-plugin-import

lint:
	npx eslint ./bin/
	npx eslint ./src/

test:
	npm run test

test-coverage:
	coverage ./bin/gendiff.js

