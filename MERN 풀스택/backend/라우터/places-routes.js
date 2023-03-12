const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const controller = require("../컨트롤러/place-control");

// 현재 getbyid.getplacebyid는 함수를 가리키는 포인터니깐 ()를 붙히면 안된다.
router.get("/:pid", controller.getplaceById);

router.get("/user/:uid", controller.getuserById);

router.post(
  "/",
  [
    // check(x) : x에는 req.body의 필드 이름을 지정해주어야 한다.
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  controller.createPlace
);

// 같은 URL로 받아도 무슨 API를 사용하는지에 따라 괜찬다. 같은 API에 같은 URL은 충돌 발생
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  controller.updatePlace
);

router.delete("/:pid", controller.deletePlace);

module.exports = router;
