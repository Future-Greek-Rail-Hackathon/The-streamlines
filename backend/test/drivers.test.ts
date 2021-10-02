import * as PackageServices from "../src/models/packages.service";
import * as DriverServices from "../src/models/drivers.service";
import app from "../src/index";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

//######################## CLUSTER TESTING ########################//
describe("Drivers API", () => {
  describe("Test get route /api/drivers", () => {
    it("It should return all the packages", () => {
      chai
        .request(app)
        .get("/api/drivers")
        .then((res) => {
          chai.expect(res.status).equal(200);
          chai.expect(res.body).to.be("array");
          chai.expect(res.body).length.to.not.be.eq(0);
        });
    });
  });

  describe("Test get route /api/drivers/:id", () => {
    it("It should return the driver based on the id", () => {
      chai
        .request(app)
        .get("/api/drivers/1")
        .then((res) => {
          chai.expect(res.status).equal(200);
          chai.expect(res.body).to.be("object");
        });
    });
  });

  describe("Test get route /api/drivers/driver_packages/:id", () => {
    it("It should return the drivers packages based on the id", () => {
      chai
        .request(app)
        .get("/api/drivers/driver_packages/1")
        .then((res) => {
          chai.expect(res.status).equal(200);
          chai.expect(res.body).to.be("array");
        });
    });
  });

  describe("Test get route /api/drivers/driver_remaining_packages/:id", () => {
    it("It should return the drivers unscanned packages based on the id", () => {
      chai
        .request(app)
        .get("/api/drivers/driver_remaining_packages/1")
        .then((res) => {
          chai.expect(res.status).equal(200);
          chai.expect(res.body).to.be("array");
        });
    });
  });
});
