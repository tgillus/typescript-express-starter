import 'source-map-support/register';
import './util/env';
import { app } from './server/app';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
