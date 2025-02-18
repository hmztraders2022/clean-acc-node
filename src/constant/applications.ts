const basePath = '/';

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: '24h',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'secrP9233i',
  },
  authorizationIgnorePath: [
    '/',
    '/auth/login',
    '/auth/register',
  ],
};