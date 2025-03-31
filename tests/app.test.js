const request = require('supertest');
const app = require('../app');

describe('API de tareas', () => {
  it('debe obtener todas las tareas', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
  });

  it('debe obtener una tarea específica', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('debe responder 404 si la tarea no existe', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toBe(404);
  });
});
