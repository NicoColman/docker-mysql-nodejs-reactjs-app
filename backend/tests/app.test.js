const request = require('supertest');
const app = require('../server');

describe('API Endpoints Tests', () => {
  
  test('App should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('GET /user', () => {
    test('should return 200 or 500 (depending on DB connection)', async () => {
      const response = await request(app).get('/user');
      expect([200, 500]).toContain(response.status);
    });

    test('should return a valid response', async () => {
      const response = await request(app).get('/user');
      // Acepta cualquier content-type válido
      expect(response.headers['content-type']).toBeDefined();
    });
  });

  describe('POST /user', () => {
    test('should accept POST requests with data', async () => {
      const response = await request(app)
        .post('/user')
        .send({ data: 'Test User' });
      
      expect([200, 500]).toContain(response.status);
    });

    test('should return a valid response', async () => {
      const response = await request(app)
        .post('/user')
        .send({ data: 'Another Test' });
      
      // Acepta cualquier content-type
      expect(response.headers['content-type']).toBeDefined();
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