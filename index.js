// 추가 기능들 가져오기
const express = require('express'); // 표현 불러오기
const app = express(); // 표현 활성화
const fs = require('fs');

// 사용자 정보를 저장할 users.json 파일 경로
const USERS_FILE_PATH = './users.json';

// GET 요청에 따른 모든 유저 정보 반환 API
app.get('/users', (req, res) => {
  // users.json 파일에서 사용자 정보 읽어오기
  fs.readFile(USERS_FILE_PATH, (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      res.status(500).send('서버 오류');
      return;
    }

    const users = JSON.parse(data);
    res.status(200).json(users);
  });
});

// GET 요청에 응답하는 API
app.get('/users/:id/:pw', (req, res) => {
  const userId = req.params.id;
  const userPassword = req.params.pw;

  // users.json 파일에서 사용자 정보 읽어오기
  fs.readFile(USERS_FILE_PATH, (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      res.status(500).send('서버 오류');
      return;
    }

    const users = JSON.parse(data);

    // 요청된 ID에 해당하는 정보 확인
    const userInfo = users[userId];

    // 해당 유저가 등록되어 있지 않은 경우
    if (!userInfo) {
      res.status(404).send('유저를 찾을 수 없습니다.');
      return;
    }

    // 비밀번호가 일치하지 않은 경우
    if (userInfo.password !== userPassword) {
      res.status(401).send('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 유저 정보 응답
    res.status(200).json({
      'id': userInfo.id,
      'name': userInfo.name
    });
  });
});

// 사용자 정보 등록 API
app.get('/users/register/:id/:pw/:name', (req, res) => {
  const newUserId = req.params.id;
  const newUserPassword = req.params.pw;
  const newUserName = req.params.name;

  // users.json 파일에서 사용자 정보 읽어오기
  fs.readFile(USERS_FILE_PATH, (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      res.status(500).send('서버 오류');
      return;
    }

    const users = JSON.parse(data);

    // 이미 등록된 유저인지 확인
    const existingUser = users[newUserId];
    if (existingUser) {
      res.status(409).send('이미 등록된 유저입니다.');
      return;
    }

    // 새로운 유저 정보 등록
    const newUser = {
      'id': newUserId,
      'password': newUserPassword,
      'name': newUserName
    };
    users[newUserId] = newUser;

    // users.json 파일 쓰기
    const writeFileCallback = (err) => {
      if (err) {
        console.error('Error writing users file:', err);
        res.status(500).send('서버 오류');
        return;
      }

      res.status(201).json(newUser);
    };
    fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), writeFileCallback);
  });
});

// 서버 실행
app.listen(3000, () => {
  console.log('서버 실행 중...');
});
