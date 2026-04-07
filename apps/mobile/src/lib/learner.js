import {
  getDashboardData as getSharedDashboardData,
  getPrograms as getSharedPrograms,
  getProgress as getSharedProgress,
} from '@learnfinity/core';
import { pb } from './pocketbase';

export function getDashboardData(userId) {
  return getSharedDashboardData(pb, userId);
}

export function getPrograms() {
  return getSharedPrograms(pb);
}

export function getProgress(userId) {
  return getSharedProgress(pb, userId);
}
