'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var express_1 = __importDefault(require('express'));
var tm_shared_1 = require('@tm-tools/tm-shared');
var body_parser_1 = __importDefault(require('body-parser'));
var app = express_1['default']();
app.use(body_parser_1['default'].json());
app.get('/api/templates', function (req, res) {
  res.send(tm_shared_1.readTemplate());
});
app.post('/api/templates', function (req, res) {
  tm_shared_1.registerTemplate(req.body.name, req.body.url, req.body.type);
  res.send({
    name: req.body.name,
    url: req.body.url,
    type: req.body.type,
  });
});
app.get('/api/templates/:template', function (req, res) {
  var templateMap = tm_shared_1.readTemplate();
  res.send(templateMap[req.params.template]);
});
app['delete']('/api/templates/:template', function (req, res) {
  tm_shared_1.unregisterTemplate(req.params.template);
  res.status(200).send();
});
app.post('/api/templates/:template', function (req, res) {
  tm_shared_1.resolveTemplate(req.params.template, req.body.projectName);
  res.status(200).send();
});
app.use('/', express_1['default'].static('./build'));
app.use(function (req, res, next) {
  res.sendFile('./build/index.html', { root: process.cwd() });
});
// app.listen(3000, () => {
//   console.log('Listening on http://localhost:3000');
// });
exports['default'] = app;
