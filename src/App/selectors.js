/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectGlobal = (state) => state.global || initialState;

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.currentUser);

const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.error);

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    (globalState) => globalState.userData.repositories
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
