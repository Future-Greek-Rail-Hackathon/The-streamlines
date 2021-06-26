import *as PackageServices from '../models/packages.service';
import *as DriverServices from '../models/drivers.service';
import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http'
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

//######################## PACKAGE TESTING ##########################//

describe("Package API", () => {
  describe("Test get route /api/packages", () => {
    it("It should return all the packages", () => {
      chai
        .request(app)
        .get("/api/packages")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body).to.be("array")
          chai.expect(res.body).length.to.not.be.eq(0)
        })
    });
  });

  describe("Test get route /api/packages/remaining/all", () => {
    it("It should return all the remaining packages", () => {
      chai
        .request(app)
        .get("/api/packages/remaining/all")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body).to.be("array")
        })
    });
  });

  describe("Test post route /api/packages/reset", () => {
    it("It should reset the state of the in-memory lists and return all the packages", () => {
      chai
        .request(app)
        .get("/api/packages/reset")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body).to.be("array")
          chai.expect(res.body).length.to.be.eq(10)
        })
    });
  });

  describe("Test get route /api/packages/:id", () => {
    it("It should return a single package based on id", () => {
      chai
        .request(app)
        .get("/api/packages/1")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body.data).to.be("object")
        })
    });
  });

  describe("Test post route /api/packages", () => {
    it("It should create a single package and return it", () => {
      chai
        .request(app)
        .post("/api/packages")
        .send({
          voucher: "W0W",
          postcode: 12345,
          scanned: false,
          deliverd: false,
        })
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body.data).to.be("object")
        })
    });
  });

  describe("Test put route /api/packages/scan/:id", () => {
    it("It should scan (update) a single package and return it", () => {
      chai
        .request(app)
        .put("/api/packages/scan/1")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body.data).to.be("object")
          chai.expect(res.body.data.scanned).to.be.equal(true)
        })
    });
  });

  describe("Test put route /api/packages/deliver/:id", () => {
    it("It should deliver (update) a single package and return it", () => {
      chai
        .request(app)
        .put("/api/packages/scan/1")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body.data).to.be("object")
          chai.expect(res.body.data.delivered).to.be.equal(true)
        })
    });
  });

  describe("Test delete route /api/packages/:id", () => {
    it("It should delete a single package", () => {
      chai
        .request(app)
        .delete("/api/packages/1")
        .then(res => {
          chai.expect(res.status).equal(200)
        })
    });
  });


});


//######################## CLUSTER TESTING ##########################//
describe("Cluster API", () => {
  describe("Test get route /api/clusters", () => {
    it("It should return all the clusters", () => {
      chai
        .request(app)
        .get("/api/clusters")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body).to.be("array")
          chai.expect(res.body).length.to.not.be.eq(0)
        })
    });
  });

  describe("Test get route /api/clusters/:id", () => {
    it("It should return a single cluster based on id", () => {
      chai
        .request(app)
        .get("/api/clusters/1")
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body).to.be("object")
        })
    });
  });

  describe("Test post route /api/clusters", () => {
    it("It should create a single cluster and return it", () => {
      chai
        .request(app)
        .post("/api/cluster")
        .send({
          name: "D",
          packages_ids: [],
          starting: "20",
        })
        .then(res => {
          chai.expect(res.status).equal(200)
          chai.expect(res.body.data).to.be("object")
        })
    });
  });



});
