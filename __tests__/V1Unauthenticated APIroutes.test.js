'user strict'
process.env.SECRET = 'toes';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server').server


const mockRequest = supergoose(server);



describe('V1 (Unauthenticated API) routes', () => {

  it('POST /api/v1/:model adds an item to the DB and returns an object with the added item', async() => {

    const response = await mockRequest.post('/api/v1/clothes').send({ name: "mosab", color: "blue", size: "30" });
    const userObject = response.body;
    // console.log('response.body', response.body);
    expect(response.status).toBe(201);
    expect(userObject._id).toBeDefined();
    expect(userObject.size).toBeDefined();

  })

  it('GET /api/v1/:model returns a list of :model items', async() => {

    const response = await mockRequest.get('/api/v1/clothes')
    const userObject = response.body;
    // console.log('response.body', response.body);
    expect(response.status).toBe(200);
    expect(userObject[0]._id).toBeDefined();
    expect(userObject[0].size).toBeDefined();

  })
  it('GET /api/v1/:model/ID returns a single item by ID', async() => {
    const responseA = await mockRequest.get('/api/v1/clothes')
    const dd = responseA.body;
    // console.log(dd[0]._id);
    const response = await mockRequest.get(`/api/v1/clothes/${dd[0]._id}`)
    const userObject = response.body;
    // console.log('response.body', response.body);
    expect(response.status).toBe(200);
    expect(userObject._id).toBeDefined();
    expect(userObject.size).toBeDefined();

  })

  it('PUT /api/v1/:model/ID returns a single, updated item by ID', async() => {
    const responseA = await mockRequest.get('/api/v1/clothes')
    const dd = responseA.body;
    // console.log(dd[0]._id);
    const response = await mockRequest.put(`/api/v1/clothes/${dd[0]._id}`).send({ name: "kaled", color: "red", size: "30" })
    const userObject = response.body;
    // console.log('response.body', response.body);
    expect(response.status).toBe(200);
    expect(userObject.name).toEqual('kaled');
    expect(userObject.size).toBeDefined();

  })



  it('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found', async() => {
    const responseA = await mockRequest.get('/api/v1/clothes')
    const dd = responseA.body;

    const response = await mockRequest.delete(`/api/v1/clothes/${dd[0]._id}`)
    const userObject = response.body;


    const responseB = await mockRequest.get('/api/v1/clothes')
    const ff = responseB.body;
    console.log('response.body', ff);

    expect(response.status).toBe(200);
    expect(ff).toEqual([]);


  })





})