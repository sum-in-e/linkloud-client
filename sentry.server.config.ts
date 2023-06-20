import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const MODE = process.env.NEXT_PUBLIC_MODE;

if (SENTRY_DSN && MODE === 'production') {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
  });
}
