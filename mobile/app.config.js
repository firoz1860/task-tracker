/** @type {import('expo/config').ConfigContext} */
module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl:
      process.env.EXPO_PUBLIC_API_URL ||
      config.extra?.apiUrl ||
      'http://10.0.2.2:5000',
  },
});
