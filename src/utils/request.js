import request from 'request';

export default new class {
  get = (uri) => new Promise((resolve, reject) => {
    const options = {
      uri,
      method: 'GET'
    };
    request(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`statusCode is ${response.statusCode}`));
      }

      try {
        const data = JSON.parse(body);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  });
};
