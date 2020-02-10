/*
	-*- coding: utf-8 -*-

	This file is part of REANA.
	Copyright (C) 2020 CERN.

  REANA is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
*/

import config from "./config";
import { parseWorkflows } from "./util";

export const USER_FETCH = "Fetch user authentication info";
export const USER_RECEIVED = "User info received";
export const USER_LOGOUT = "User logged out";

export const WORKFLOWS_FETCH = "Fetch workflows info";
export const WORKFLOWS_RECEIVED = "Workflows info received";

const USER_INFO_URL = config.api + "/api/me";
const USER_LOGOUT_URL = config.api + "/api/logout";
const WORKFLOWS_URL = config.api + "/api/workflows";

export function loadUser() {
  return async dispatch => {
    let resp, data;
    try {
      dispatch({ type: USER_FETCH });
      resp = await fetch(USER_INFO_URL, { credentials: "include" });
    } catch (err) {
      throw new Error(USER_INFO_URL, 0, err);
    }
    if (resp.status === 401) {
      console.log("User must be logged in");
    } else if (resp.ok) {
      data = await resp.json();
    }
    dispatch({ type: USER_RECEIVED, ...data });
    return resp;
  };
}

export function userLogout() {
  return async dispatch => {
    dispatch({ type: USER_LOGOUT });
    window.location.href = USER_LOGOUT_URL;
  };
}

export function fetchWorkflows() {
  return async dispatch => {
    let resp, data;
    try {
      dispatch({ type: WORKFLOWS_FETCH });
      resp = await fetch(WORKFLOWS_URL, { credentials: "include" });
    } catch (err) {
      throw new Error(USER_INFO_URL, 0, err);
    }
    if (resp.ok) {
      data = await resp.json();
    }
    dispatch({ type: WORKFLOWS_RECEIVED, workflows: parseWorkflows(data) });
    return resp;
  };
}
