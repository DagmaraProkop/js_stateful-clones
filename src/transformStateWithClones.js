'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const stateHistory = [];
const stateChange = {};

for (const key in state) {
  stateChange[key] = state[key];
} // copy state object to stateChange

function transformStateWithClones(stateChange, actions) {
  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateChange, key.extraData);
      stateHistory.push(stateChange);
    } else if (key.type === 'removeProperties') {
      for (const key1 of key.keysToRemove) {
        delete stateChange[key1];
        stateHistory.push(stateChange);
      }
    } else if (key.type === 'clear') {
      for (const key2 in stateChange) {
        delete stateChange[key2];
        stateHistory.push(stateChange);
      }
    }
  }
}
module.exports = transformStateWithClones;
