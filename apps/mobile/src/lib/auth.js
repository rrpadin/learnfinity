import { loginWithPassword, logoutUser, signupUser } from '@learnfinity/core';
import { pb } from './pocketbase';

export function login(email, password) {
  return loginWithPassword(pb, email, password);
}

export function signup(payload) {
  return signupUser(pb, payload);
}

export function logout() {
  logoutUser(pb);
}
