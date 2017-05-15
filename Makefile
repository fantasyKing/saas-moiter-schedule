
dist:
	rm -rf dist && mkdir dist && \
	./node_modules/.bin/babel src --out-dir dist
	cp package.json dist/ \

start:
	./node_modules/.bin/babel-node src/index.js

client:
	./node_modules/.bin/babel-node src/util/make_client.js

brush_test:
	NODE_ENV=test ./node_modules/.bin/babel-node ./brush_user_name.js

brush_pro:
	NODE_ENV=production ./node_modules/.bin/babel-node ./brush_user_name.js

.PHONY: test build dist start example client
