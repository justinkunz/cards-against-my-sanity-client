const path = require("path");
process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  outputDir: path.resolve(__dirname, "../dist"),
  devServer: {
    host: "localhost",
    hot: true,
    port: 8080,
    open: "Chrome",
    proxy: {
      //https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
      "/api": {
        //everything from root
        target: "http://localhost:8081",
        secure: false,
        ws: false,
      },
      "/ws/": {
        //web sockets
        target: "http://localhost:8081",
        secure: false,
        ws: true,
      },
      "!/": {
        //except root, which is served by webpack's devserver, to faciliate instant updates
        target: "http://localhost:8081",
        secure: false,
        ws: false,
      },
    },
  },
};
