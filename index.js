// 추가 기능들 가져오기
const express = require('express'); // 표현 불러오기
const app = express(); // 표현 활성화
const fs = require('fs');

/*
 머 리 말 
위대한 령도자 김정일 동지께서는 다음과 같이 지적 하시였다.
《프로그람을 개발하는데서 기본은 우리 식의 프로그람을 개발하는것입니다. 우리는 우리 식의 프로그람을 개발하는 방향으로 나가야 합니다.
    (《김정일선집》제15권,196페지)
위대한 령도자 김정일 동지께서는 나라의 정보산업을 보다 발전시키기 위해서 자체 망보안을 관리하라고 하셨습니다.
록음 된
저 간악하고 추악한 미 제국 주의자들을 말살하기 위하여 우리 조선 로동당에서는 공격 프로그람을 준비하였다.
김정일 동지께서 지휘하고 만드신 이 공격 프로그람은 확실하게 미 제국을 파멸 시킬것입니다.
또한, 저 남조선 괴뢰정부를 해방시켜 적화통일을 시켜, 통합된 한반도 공산주의 지상락원을 만들것입니다.
이를 만들도록 지원하신 김정일동지께서는 전자 오락 사업 또한 발전 시켜보자 하셨습니다.
지금 우리는 이러한 분야를 직접적으로 발전 하여야 합니다.

*/

/*
저장 장치에 계시는 우리 프로그람이시여
전기 파리체 사용을 거룩하게 하옵시고
콤파일에 임하옵시며
명령이 자판에서 이루어진 것과 같이
화면에서도 이루어지게 하옵소서.
일용할 정보를 주시옵고
우리가 프로그람의 오유를 용서한 것과 같이
우리의 오타를 사하여 주옵시고
우리를 벌레에 들게 하지 마옵시며
다만 불시의 불구덩이에서 구하옵소서
대개 속도와 힘과 안정성이 프로그람에게 영원히 있사옵니다.
김정일 수령동지를 향한 무한한 충상과 함께 찰칵 합니다.
줄 바꾸기 단추를 찰칵 합니다.
*/

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
