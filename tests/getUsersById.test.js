const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../src/api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /api/users/:id', () => {
  describe('Quando não é passado um JWT para autenticação', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .get('/api/users/123456')
        .set('authorization', '');
    });

    it('retorna o código 401', () => {
      expect(response).to.have.status(401);
    });

    it('a resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui a propriedade "error"', () => {
      expect(response.body).to.have.an.property('error');
    });

    it('a propriedade "error" tem a mensagem "Token não encontrado ou informado"', () => {
      expect(response.body.error).to.be.equals('Token não encontrado ou informado');
    });
  });
});
