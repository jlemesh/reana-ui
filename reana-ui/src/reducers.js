/*
	-*- coding: utf-8 -*-

	This file is part of REANA.
	Copyright (C) 2020 CERN.

  REANA is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
*/

import { combineReducers } from "redux";
import {
  USER_FETCH,
  USER_RECEIVED,
  USER_LOGOUT,
  WORKFLOWS_FETCH,
  WORKFLOWS_RECEIVED
} from "./actions";

const authInitialState = {
  email: null,
  reanaToken: null,
  loadingUser: false
};

const workflowsInitialState = {
  workflows: null,
  loadingWorkflows: false
};

const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case USER_FETCH:
      return { ...state, loadingUser: true };
    case USER_RECEIVED:
      return {
        ...state,
        email: action.email,
        fullName: action.full_name,
        username: action.username,
        reanaToken: action.reana_token,
        loadingUser: false
      };
    case USER_LOGOUT:
      return authInitialState;
    default:
      return state;
  }
};

const workflows = (state = workflowsInitialState, action) => {
  switch (action.type) {
    case WORKFLOWS_FETCH:
      return { ...state, loadingWorkflows: true };
    case WORKFLOWS_RECEIVED:
      return {
        ...state,
        workflows: action.workflows,
        loadingWorkflows: false
      };
    default:
      return state;
  }
};

const reanaApp = combineReducers({
  auth,
  workflows
});

export default reanaApp;
