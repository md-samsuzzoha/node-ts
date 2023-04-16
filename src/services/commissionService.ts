import fetch from 'node-fetch';

import { apiUri } from '../environments/environment.js';

const url = apiUri;

const getCashInConfig = async () => {
  const response = await fetch(`${url}/cash-in`);
  return response.json();
};

/* It fetches cash out configs based of specified userType */
const getCashOutConfig = async (userType) => {
  if (userType !== 'natural' && userType !== 'juridical') {
    throw Error(`User type ${userType} is not supported`);
  }
  const response = await fetch(`${url}/cash-out/${userType}`);
  return response.json();
};

/* This fetches and combines all 3 types of transactions (in parallel) */
const getAllTxnConfigs = async () => {
  const [cashIn, naturalCashOut, juridicalCashOut] = await Promise.all([
    getCashInConfig(),
    getCashOutConfig('natural'),
    getCashOutConfig('juridical'),
  ]);

  return {
    cash_in: cashIn,
    cash_out: {
      natural: naturalCashOut,
      juridical: juridicalCashOut,
    },
  };
};

export { getAllTxnConfigs, getCashInConfig, getCashOutConfig };
