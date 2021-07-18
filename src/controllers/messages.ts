import express from 'express';

export const getMessage: express.RequestHandler = (req, res) => {
  const body = {
    message: 'Hello Express!',
  };

  res.json(body).status(200);
};
