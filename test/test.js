var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("Surveys", function(){
    describe ("PROTECTED ROUTE", function(){
        it("should give 401 error because no auth token provided", done=>{
            chai.request(server)
                .get("/surveys/")
                .send({})
                .end((err,res)=>{
                    res.should.have.status(401);
                    done();
                });
        });
    });
});

describe("Users", function(){
    describe ("AUTH", function(){
        it("should respond with status 200 and JWT", done=>{
            chai.request(server)
                .post("/users/authenticate")
                .send({
                    "username": "vara"
                })
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    done();
                });
        });
    });
});

describe("Images", function(){
    describe ("PUBLIC ROUTE", function(){
        it("should respond with status 200", done=>{
            chai.request(server)
                .post("/images/resize")
                .send({
                    "url": "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png"
                })
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
