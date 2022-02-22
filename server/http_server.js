const app = require('./index.js');
const port = 1234;

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 1234');
});