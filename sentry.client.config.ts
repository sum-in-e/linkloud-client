import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const MODE = process.env.NEXT_PUBLIC_MODE;

if (SENTRY_DSN && MODE === 'production') {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    debug: false,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    ignoreErrors: ['Non-Error promise rejection captured'],
  });
}
