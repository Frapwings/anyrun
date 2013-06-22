REPORTER = spec

check: test

test:
	@./node_modules/.bin/mocha \
		--timeout 20000 \
		--reporter $(REPORTER) \
		./test/*.js

.PHONY: test
