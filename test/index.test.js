const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should(); //Sonucu şu olmalı gibi ifadeler için chainin metodu.
const server = require('../app');

chai.use(chaiHttp);

describe('Node Server', () => {
  it('(GET /) returns the home page', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
