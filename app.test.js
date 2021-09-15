const request = require('supertest');

const  app  = require('./app');



// testing create blog
describe('POST /api/blog/create', () => {
  describe('given  title,content', () => {
    test('should respond with a status code of 201', async () => {
      const response = await request(app).post('/api/blog/create').send({
        title:"test",
        content:"just testing",
       
      });
      expect(response.statusCode).toBe(201);
    });
  });
 
});
//testing update blog
describe('POST /api/blog/update', () => {
  describe('given  title,content', () => {
    test('should respond with a status code of 201', async () => {
      const response = await request(app).put('/api/blog/update/6').send({
        title:"test",
        content:"just testing update",
       
      });
      expect(response.statusCode).toBe(200);
    });
  });
 
});
//testing delete blog
//enter the id of a blog that exist in your db
describe('POST /api/blog/delete', () => {
  describe('given  title,content', () => {
    test('should respond with a status code of 201', async () => {
      const response = await request(app).delete('/api/blog/delete/5')
      expect(response.statusCode).toBe(200);
    });
  });
 
});