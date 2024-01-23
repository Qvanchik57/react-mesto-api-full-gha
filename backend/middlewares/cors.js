const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'sergey.nomoredomainsmonster.ru',
  'api.sergey.nomoredomainsmonster.ru',
  'http://sergey.nomoredomainsmonster.ru',
  'https://sergey.nomoredomainsmonster.ru',
  'http://api.sergey.nomoredomainsmonster.ru',
  'https://api.sergey.nomoredomainsmonster.ru',
  'http://158.160.130.154',
  'https://158.160.130.154',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return (next());
};
