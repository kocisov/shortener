module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/api",
      },
    ];
  },
};
