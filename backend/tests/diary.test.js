const request = require('supertest');
const app = require('../src/app');
const setupDB = require('./setup');
const Product = require('../src/models/Product');

beforeAll(async () => {
  await setupDB.connect();
});

afterAll(async () => {
  await setupDB.closeDatabase();
});

afterEach(async () => {
  await setupDB.clearDatabase();
});

test('Add product to diary and remove it using new DELETE route', async () => {
  // 1. register
  const user = { name: 'U', email: 'u@a.com', password: '123456' };
  await request(app).post('/api/auth/register').send(user);

  // 2. login
  const loginRes = await request(app).post('/api/auth/login').send({ email: user.email, password: user.password });
  const accessToken = loginRes.body.data.accessToken;

  // 3. seed product
  const product = await Product.create({ title: { en: 'Apple' }, calories: 52, categories: ['fruit'] });

  const date = '2026-05-20';

  // 4. add to diary
  const addRes = await request(app).post('/api/diary').set('Authorization', `Bearer ${accessToken}`).send({ date, productId: product._id.toString(), weight: 150 });
  expect(addRes.statusCode).toBe(201);
  const eatenProducts = addRes.body.data.eatenProducts;
  expect(eatenProducts.length).toBeGreaterThan(0);

  const recordId = eatenProducts[0]._id || eatenProducts[0].id;

  // 5. remove using new route
  const delRes = await request(app).delete(`/api/diary/${date}/product/${recordId}`).set('Authorization', `Bearer ${accessToken}`);
  expect(delRes.statusCode).toBe(200);
  expect(delRes.body.status).toBe('success');
});
