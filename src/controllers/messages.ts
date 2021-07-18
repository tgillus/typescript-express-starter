import express from 'express';

const getMessage: express.RequestHandler = (req, res) => {
  const body = {
    message: 'Hello Express!',
  };

  res.json(body).status(200);
};

export { getMessage };
