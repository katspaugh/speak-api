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
  return { statusCode: 500 };
}

module.exports.speak = (event, context, callback) => {
  const speak = spawn(path.resolve('./speak'), [
    '--path=' + path.resolve('.'),
    '-q',
    '--ipa',
    '--stdin'
  ]);

  speak.stdin.setEncoding('utf-8');
  speak.stdout.pipe(event.body.trim());

  speak.stdout.on('data', (data) => {
    callback(null, response(data.toString('utf-8')));
  });

  speak.stderr.on('data', (data) => {
    callback(null, errorResponse(data.toString('utf-8')));
  });
};
