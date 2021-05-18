'user strict'
process.env.SECRET = 'toes';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server').server


const mockRequest = supergoose(server);





describe('Auth Router', () => {
  it('can create one', async() => {
    const response = await mockRequest.post('/signup').send({ username: 'hhhhh', password: 'ggwell' });
    const userObject = response.body;
    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user._id).toBeDefined();


  })

  it('can signin with basic', async() => {
    const response = await mockRequest.post('/signin').auth('hhhhh', 'ggwell')
    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user._id).toBeDefined();

  })
})