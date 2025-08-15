const crypto = require('crypto');

const sentryEnvelopeUrl = `https://o4507096816484352.ingest.sentry.io/api/4507096819892224/envelope/?sentry_key=${process.env.SENTRY_KEY}&sentry_version=7`;

function flatten(obj, acc = {}, prefix = '') {
  Object.entries(obj).forEach(([key, value]) => {
    const p = (prefix ? `${prefix}.${key}` : key).replaceAll('@', 'at_').replaceAll('/', 'slash_');
    if (typeof value === 'object') {
      try {
        flatten(value, acc, p);
      } catch (e) {
        //
      }
    } else if (typeof value === 'string' && value.includes('\n')) {
      acc[p] = `...${value.split('\n')[0]}...`;
    } else if (value) {
      acc[p] = value;
    }
  });
  return acc;
}

exports.handler = async (event) => {
  const { body, headers, method } = event;
  const received = JSON.parse(body);

  if (received.eventType === 'error') {
    const now = new Date().toISOString();
    const eventId = crypto.randomUUID().replace(/-/g, '');

    const envelopeHeader = {
      event_id: eventId,
      sent_at: now,
      sdk: { name: 'custom.fetch.sender', version: '1.0' },
    };

    const itemHeader = { type: 'event' };
    const payload = {
      event_id: eventId,
      release: received.context.storybookVersion,
      user: { id: received.context.anonymousId },
      timestamp: now,
      level: 'error',
      platform: 'javascript',
      tags: flatten(received),
      message: {
        formatted: received.payload.error.message || received.errorHash || 'Unknown error',
      },
    };

    const envelope = [
      JSON.stringify(envelopeHeader),
      JSON.stringify(itemHeader),
      JSON.stringify(payload),
    ].join('\n');

    const res = await fetch(sentryEnvelopeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-sentry-envelope' },
      body: envelope,
    });

    if (!res.ok) {
      console.error('Failed to send event to Sentry', res);
    }
  }

  // we send the request forward to https://us-central1-storybook-warehouse.cloudfunctions.net/storybook-event-log-production-event-log
  const res = await fetch(
    'https://us-central1-storybook-warehouse.cloudfunctions.net/storybook-event-log-production-event-log',
    {
      method,
      body,
      headers,
    }
  );

  return {
    statusCode: res.status,
    body: await res.text(),
  };
};
