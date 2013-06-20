REPORTER = spec

check: test

test:
	@./node_modules/.bin/mocha --harmony \
		--reporter $(REPORTER) \
		./test/*.js

.PHONY: test
