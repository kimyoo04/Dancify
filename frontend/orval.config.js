module.exports = {
  django: {
    output: {
      mode: "tags-split",
      target: "src/django.ts",
      schemas: "src/model",
      client: "react-query",
      mock: true,
    },
    input: {
      target: "./django.yaml",
    },
  },
};
