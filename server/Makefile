LAMBDA_NAME=ak-check-in
FILENAME=$(LAMBDA_NAME).zip
AWSCLI=awscliv2
AWS_LAMBDA=$(AWSCLI) lambda
PYTHON_VERSION:=$(shell python --version | cut -d. -f1,2)
EXPECTED_VERSION=Python 3.12


.PHONY: install build test deploy test-remote clean all

install:
ifeq ($(PYTHON_VERSION), $(EXPECTED_VERSION))
	pip install -r requirements.txt --target build/ --upgrade
else
	@echo Incorrect python version. Expecting $(EXPECTED_VERSION)
endif

build:
	cp settings.py lambda_function.py test.py kms_utils.py ak_user.py cal_event.py build

test: build
	@cd build && \
	PYTHONPATH=. python test.py $(AUTH_HEADER)

deploy: build
	cd build && \
	zip -r $(FILENAME) * && \
	aws lambda update-function-code \
		--function-name $(LAMBDA_NAME)-uat \
		--zip-file fileb://$(FILENAME)

clean:
	rm -rf build

all: clean install build test deploy test-remote