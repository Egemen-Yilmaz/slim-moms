const request = require('supertest');
const app = require('../src/app');
const setupDB = require('./setup');
const User = require('../src/models/User');

beforeAll(async () => {
  await setupDB.connect();
});

afterAll(async () => {
  await setupDB.closeDatabase();
});

afterEach(async () => {
  await setupDB.clearDatabase();
});

test('Register and login flow', async () => {
  const userPayload = { name: 'Test', email: 'test@a.com', password: '123456' };

  // Register
  const regRes = await request(app).post('/api/auth/register').send(userPayload);
  expect(regRes.statusCode).toBe(201);
  expect(regRes.body.data).toHaveProperty('user');

  // Login
  const loginRes = await request(app).post('/api/auth/login').send({ email: userPayload.email, password: userPayload.password });
  expect(loginRes.statusCode).toBe(200);
  expect(loginRes.body.data).toHaveProperty('accessToken');
  expect(loginRes.body.data).toHaveProperty('refreshToken');

  // Ensure user created in DB
  const userInDb = await User.findOne({ email: userPayload.email });
  expect(userInDb).not.toBeNull();
});
