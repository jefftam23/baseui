/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global after */
const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Input Test Suite';

const selectors = {
  input: 'input[data-test="e2e"]',
};

describe('The input component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  xit('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.STATE_EXAMPLE,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible(selectors.input)
      .assert.accessibility('html', {
        rules: {
          label: {
            enabled: false,
          },
        },
      });
  });

  it('preset value is displayed', browser => {
    goToUrl({
      suite,
      test: scenarios.STATE_EXAMPLE,
      browser,
    })
      .waitForElementVisible(selectors.input)
      .getValue(selectors.input, function(result) {
        this.assert.equal(result.value, 'uber');
      });
  });
  it('entered value is displayed', browser => {
    goToUrl({
      suite,
      test: scenarios.STATE_EXAMPLE,
      browser,
    })
      .waitForElementVisible(selectors.input)
      .setValue(selectors.input, '_good')
      .getValue(selectors.input, function(result) {
        this.assert.equal(result.value, 'uber_good');
      });
  });
});
