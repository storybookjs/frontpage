import fetch from 'node-fetch';
import { stringify } from 'querystring';
import LRU from 'lru-cache';
import { BigQuery } from '@google-cloud/bigquery';
import crypto from 'crypto';
import semver from 'semver';

const CACHE_KEY = 'versions';
const cache = new LRU({
  max: 64 * 1024, // 64kb
  maxAge: 20 * 60 * 60 * 1000, // 30 mins
  length: (n, key) => n.length,
});

// const logger = console;
const logger = { log: () => {} };

const {
  SB_VERSIONS_ENDPOINT = 'http://localhost:8000/versions-raw.json',
  GCP_CREDENTIALS,
  DEBUG_IPS,
} = process.env;

const md5 = (host) => {
  const hash = crypto.createHash('md5');
  hash.update(host);
  return hash.digest('hex');
};

const truncate = (host) => {
  const prefix = host.slice(0, host.lastIndexOf('.'));
  return `${prefix}.0`;
};

const splitVersion = (version) => {
  const parsed = semver.parse(version);
  if (!parsed) return {};

  return {
    versionMajor: parsed.major,
    versionMinor: parsed.minor,
    versionPatch: parsed.patch,
    versionPrerelease: parsed.prerelease.length > 0 ? parsed.prerelease.join('.') : undefined,
  };
};

const log = async (event) => {
  if (!GCP_CREDENTIALS) {
    logger.log('no gcp credentials, skipping');
    return;
  }
  logger.log('logging event');

  const gcpCredentials = JSON.parse(GCP_CREDENTIALS);
  const bigquery = new BigQuery({
    projectId: gcpCredentials.project_id,
    credentials: gcpCredentials,
  });
  const dataset = bigquery.dataset('log');
  const table = dataset.table('requests');

  const { current: version } = event.queryStringParameters || {};

  const { headers } = event;
  const truncatedHost = truncate(remotehost);
  let remotehost = headers['x-forwarded-for'] || headers.host;
  if (DEBUG_IPS !== 'true') {
    remotehost = md5(remotehost);
  }
  const userAgent = headers['user-agent'];

  const row = {
    timestamp: new Date().toISOString(),
    remotehost,
    truncatedHost,
    version,
    userAgent,
    ...splitVersion(version),
    cli: userAgent && userAgent.startsWith('node-fetch'),
  };
  await table.insert([row]);
};

const versions = async (event) => {
  logger.log('fetching versions');
  let body = cache.get(CACHE_KEY);
  if (!body) {
    const url = `${SB_VERSIONS_ENDPOINT}?${stringify(event.queryStringParameters)}`;
    logger.log('filling cache', url);
    const res = await fetch(url);
    body = await res.text();
    cache.set(CACHE_KEY, body);
  }
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body,
  };
};

exports.handler = async (event, context, callback) => {
  const res = await Promise.all([versions(event), log(event)]);
  return res[0];
};
