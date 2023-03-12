const uuid = require("uuid");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Park",
    email: "test@test.com",
    password: "tester",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("똑바로 입력하세요");
    err.code = 422;
    return next(err);
  }

  const newuser = req.body;

  const checkuser = DUMMY_USERS.find((u) => u.email === newuser.email);
  if (checkuser) {
    const error = new Error("이미 사용중인 이메일입니다.");
    error.code = 422;
    return next(error);
  }

  DUMMY_USERS.push({ id: uuid.v4(), ...newuser });

  res.status(201).json({ user: DUMMY_USERS });
};

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("똑바로 입력하세요");
    err.code = 422;
    return next(err);
  }

  const { email, password } = req.body;
  const check = DUMMY_USERS.find((u) => u.email === email);

  if (!check || check.password !== password) {
    const error = new Error("해당 유저의 정보가 없습니다!");
    error.code = 401;
    return next(error);
  }
  // json은 json형식으로 값을 보내고 send는 text형식으로 값을 보냄
  res.json({ message: "로그인 성공!" });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
