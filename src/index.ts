import 'source-map-support/register';
import './util/env';
import { app } from './server/server';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
