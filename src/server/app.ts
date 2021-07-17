import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const body = {
    message: 'Hello Express!',
  };

  res.json(body).status(200);
});

export { app };
