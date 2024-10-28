// eslint-disable-next-line @typescript-eslint/no-var-requires
const createClient = require('redis').createClient;

async function testRedisConnection() {
  const client = createClient({
    // url: 'rediss://clustercfg.redis.hx0l8f.memorydb.us-east-1.amazonaws.com:6379',
    url: 'redis://localhost:6379',
    tls: false,
    // rejectUnauthorized: false,
  });
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();
  const msg = await client.ping();
  console.log('msg');
  console.log(msg);
  await client.disconnect();
}

testRedisConnection().catch(console.error);
