module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns:[
    "/node_modules/",
    "/templates/"
  ],
  collectCoverage:true,
  coverageThreshold:{
    "global":{
      "branches":60,
      "lines":70,
      "statements":80,
      "functions":80
    }
  }
};