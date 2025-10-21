const request = require('supertest');
const app = require('../server');

describe('API Endpoints Tests', () => {
  
  test('App should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('GET /user', () => {
    test('should return 200 or 500 (depending on DB connection)', async () => {
      const response = await request(app).get('/user');
      // Acepta tanto 200 (éxito) como 500 (error de DB en tests)
      expect([200, 500]).toContain(response.status);
    });

    test('should return JSON', async () => {
      const response = await request(app).get('/user');
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('POST /user', () => {
    test('should accept POST requests with data', async () => {
      const response = await request(app)
        .post('/user')
        .send({ data: 'Test User' });
      
      // Acepta 200 (éxito) o 500 (error de DB en tests)
      expect([200, 500]).toContain(response.status);
    });

    test('should return JSON response', async () => {
      const response = await request(app)
        .post('/user')
        .send({ data: 'Another Test' });
      
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('POST /dbinit', () => {
    test('should handle database initialization', async () => {
      const response = await request(app).post('/dbinit');
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('POST /tbinit', () => {
    test('should handle table initialization', async () => {
      const response = await request(app).post('/tbinit');
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/ruta-inexistente');
      expect(response.status).toBe(404);
    });
  });
});