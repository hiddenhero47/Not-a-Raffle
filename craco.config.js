module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Suppress source map warnings (e.g., from WalletConnect packages)
        webpackConfig.ignoreWarnings = [
          (warning) =>
            typeof warning.message === 'string' &&
            warning.message.includes('Failed to parse source map'),
        ];
        return webpackConfig;
      },
    },
  };
  