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

test('Public calorie endpoint returns dailyCalorieIntake and notAllowedProducts', async () => {
  // Seed a product with a groupBloodNotAllowed structure
  await Product.create({ title: { en: 'Banana' }, calories: 89, groupBloodNotAllowed: { 1: false, 2: true } , categories: ['fruit'] });

  const payload = { weight: 80, height: 170, age: 30, targetWeight: 70, bloodType: 'A' };
  const res = await request(app).post('/api/products/public-calorie').send(payload);

  expect(res.statusCode).toBe(200);
  expect(res.body.data).toHaveProperty('dailyCalorieIntake');
  expect(res.body.data).toHaveProperty('notAllowedProducts');
});
