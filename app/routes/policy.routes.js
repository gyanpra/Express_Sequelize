module.exports = app => {
    const policies = require("../controllers/policy.controller.js");
  
    var router = require("express").Router();
  

    router.post("/", policies.create);
  

    router.get("/", policies.findAll);
  

    router.get("/:id", policies.findOne);
  

    router.put("/:id", policies.update);
  

    router.delete("/:id", policies.delete);
  

    router.delete("/", policies.deleteAll);
  
    app.use("/policies", router);
  };

  
  