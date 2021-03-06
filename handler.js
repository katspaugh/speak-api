const path = require('path');
const spawn = require('child_process').spawn;

function response(view) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(view)
  }
}

function errorResponse(err) {
  console.log(err);
  return {
    statusCode: 500,
    body: {
      error: err.message
    }
  }
}

module.exports.speak = (event, context, callback) => {
  const defaultLanguage = 'en';
  const params = JSON.parse(event.body);

  const speak = spawn(path.resolve('./speak'), [
    '--path=' + path.resolve('.'),
    '-q',
    '--ipa',
    '--stdin',
    `-v${ params.language.toLowerCase() || defaultLanguage }`
  ]);

  speak.stdin.setEncoding('utf-8');
  speak.stdin.write(params.text);
  speak.stdin.end();

  speak.stdout.on('data', (data) => {
    callback(null, response({
      language: params.language,
      text: data.toString('utf-8').trim()
    }))
  });

  speak.stderr.on('data', (data) => {
    callback(null, errorResponse(data.toString('utf-8')));
  });
};
