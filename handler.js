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
  const speak = spawn('./bin/speak', ['-lh', '/usr']);

  speak.stdout.on('data', (data) => {
    callback(null, response(data));
  });

  speak.stderr.on('data', (data) => {
    callback(null, errorResponse(data));
  });

  speak.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
