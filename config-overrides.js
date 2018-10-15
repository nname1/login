/**
 * Created by lonwang on 4/25/2018.
 */
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
  config = injectBabelPlugin(["import", {libraryName: "antd",libraryDirectory: 'es', style: "css"}],
      config);
  config = rewireLess(config, env);
  return config;
};