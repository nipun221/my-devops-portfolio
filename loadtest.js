import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '20s',
};

export default function () {
  const url = __ENV.SITE_URL;
  http.get(url);
  sleep(1);
}