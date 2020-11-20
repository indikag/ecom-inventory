var assert = require('assert');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);

/**
 * Get stock count of the product id 1.
 */
describe('GET /stock/stock/1', () => {
    it('should retrieve buyable item count', (done) => {
        chai.request(server).get('/stock/stock/1').send().end((err, res) => {
            console.log(res.body.message);
            // there should be no errors
            should.not.exist(err);
            // there should be a 200 status code
            res.status.should.equal(200);
            // the response should be JSON
            res.type.should.equal('application/json');
            // the JSON response body should have a
            // key-value pair of {"status": "success"}
            res.body.message.should.eql('Success');
            // the JSON response body should have a
            // key-value pair of {"data": [2 user objects]}
            res.body.data.should.eql(1);

            done();
        });
    });
});
