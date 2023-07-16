const congratulation_audio = new Audio('congratulation.wav');
const lose_audio = new Audio('2048Lose_Mastering.wav');
const $info = document.getElementById('info');
let e;
$info.textContent = '';
/*
const url = new URL(window.location.href);
const urlParams = url.searchParams;
const score = urlParams.get('score');
const win = urlParams.get('win');
*/
let score_with_win = undefined;
let win = undefined;
let score = undefined;
let game_window = undefined;
$info.textContent = '게임 결과를 기록하기위한 창입니다. 창을 닫을시기록이 되지 않습니다. 기록을 원하지 않을 경우 이창을 닫고, 기록을 원하실경우 이창을 열어두십시오.';
let test_window = undefined;
test_window = window.open('./popup.html');
let test = undefined;
if (!test_window) {
$info.textContent = '팝업차단을 해제후 새로고침해주세요.'
} else {
game_window = window.open('./2048.html');
};
const receiveMessage = async (d) => {
e = d;
if(e.data.hasOwnProperty('score')){
    console.log(e);
    console.log(e.data.score);
    console.log(e.data.win);
    console.log(e.data.el);
    win = e.data.win;
    console.log(win);
    // startrecord(parseInt(e.data.score));
    score = e.data.score;
    startrecord(score);
};
};
window.addEventListener("message", receiveMessage, false);
/*
let encrypted;

function el_down(){
el_value = confirm('스크린샷을 내려받을까요?');
if(el_value){
    el_here = document.getElementById("target"); 
    el_here.href = el;
    el_here.download = '2048_complete.jpg';
    el_here.click();
}
}*/
function start_encrypte(v){
console.log('encrypte start.');
encrypted = undefined;
console.log('reset \'encrypted\(var\)\'.');
encrypted = CryptoJS.SHA256(v);
encrypted = String(encrypted);
console.log(encrypted);
};
let encrypted_login;
let encrypted_login_id;
let encrypted_login_pw;
let encrypted_record;

function cookie_login(n,v){
start_encrypte(n);
n = encrypted;
encrypted_login_id = n;
start_encrypte(v);
v = encrypted;
encrypted_login_pw = v;
start_encrypte(n+v);
encrypted_login = encrypted;
console.log(encrypted_login);
console.log(encrypted_login_id);
console.log(encrypted_login_pw);
};

function cookie_record(n,v){
start_encrypte(n);
n = encrypted;
v = start_encrypte(v);
start_encrypte(n+v);
encrypted_record = encrypted;
console.log(encrypted_record);
};
let cookie_temp_login;
let cookie_temp_record;
function cookie(o,p,n,v){ // o=작업, p=조회와 작성 구분, n=name, v=value(login시 pw, record시 점수)
if(o == 'login'){
    cookie_login(n,v);
    // cookie_temp_login = 1;
    if(p == 'c' && window.localStorage.getItem(encrypted_login_id) == encrypted_login){ // 체크
    cookie_temp_login = true;
    console.log('true');
    } else if(p == 'w'){ // 작성
    window.localStorage.setItem(encrypted_login_id, encrypted_login);
    };
} else if(o == 'record'){
    cookie_record(n,v);
    // cookie_temp_record = 1;
    if(p == 'c' && window.localStorage.getItem(encrypted_record) == true){ // 체크
    cookie_temp_record = window.localStorage.getItem(encrypted_record);
    // cookie_record(encrypted_login,cookie_temp_record);
    if(window.localStorage.getItem(name) == encrypted_record){
        cookie_temp_record = true;
        console.log('true');
    } else{
        cookie_temp_record = false;
        console.log('true');
    };
    } else if(p == 'w'){ // 작성
    cookie_record(encrypted_login,score);
    window.localStorage.setItem(encrypted_record,score);
    window.localStorage.setItem(name,encrypted_record);
    };
};
}
function startrecord(n) {
if (win == 0) { // Lose
    document.write(n+'점 으로 패배!');
    /*try {
    lose_audio.play();
    } catch(e) {
    console.log(`음악 재생 불가. ERROR 내용:${e}`);
    };*/
} else if (win == 1) {
    document.write(n+'점 으로 승리!');
    /*try {
    congratulation_audio.play();
    } catch(e) {
    console.log(`음악 재생 불가. ERROR 내용:${e}`);
    };*/
};
login(n);
};
let name;
let pw;
let pw1;

let restart_function = 0
function login(n){
console.log(n+'점을 기록.');
let game_window_close = 0
setTimeout(() => {
    // let input_data_empty = 0;
    name = prompt('당신의 닉네임을 작성해주세요.');
    if(name == null) {
    alert('기록이 취소되었습니다.');
    return;
    } else if(name === '') {
    login(n);
    // input_data_empty = 1;
    return;
    };
    pw = prompt('비밀번호를 입력해주세요');
    if(pw == null) {
    alert('기록이 취소되었습니다.');
    return;
    } else if(pw === '') {
    login(n);
    // input_data_empty = 1;
    return;
    };
    /*if(input_data_empty == 1) {
    console.log('empty data');
    return;
    };*/
    console.log(pw);
    if(name){
    console.log('닉네임: ' + name);
    let name_list = false;
    start_encrypte(name);
    let encrypted_name = encrypted;
    start_encrypte(pw);
    let encrypted_pw = encrypted;
    start_encrypte(name+pw);
    let encrypted_id = encrypted;
    cookie('login','c',name,pw);
    if(window.localStorage.getItem(encrypted_name)){
        name_list = window.localStorage.getItem(encrypted_name);
        console.log(name_list+pw);
        console.log(name_list+encrypted_pw);
        if(name_list == true){
        console.log('가입필요.');
        pw1 == prompt('신규 가입중...\n비밀번호를 다시 한번 입력해주세요.');
        if(pw1 == null){
            console.log('가입 취소됨.')
            restart_function = 1;
            return;
        } else if(pw == pw1){
            /*if (window.localStorage.getItem(pw1) == true) {
            alert('사용 불가능한 비밀번호입니다.');
            restart_function = 1;
            return;
            } else{
            // window.localStorage.setItem(name, pw);
            cookie('login','w',name,pw);
            console.log('완료');
            };*/
            cookie('login','w',name,pw);
            console.log('완료');
        } else{
            console.log('비밀번호 틀림');
            restart_function = 1;
            alert('비밀번호가 틀렸습니다.');
            if(true){
            return;
            };
        };
        } else if(window.localStorage.getItem(encrypted_login_id) == encrypted_login){
        console.log('기록 되어있는 닉네임.');
        } else{
        console.log('비밀번호 틀림');
        restart_function = 1;
        alert('비밀번호가 틀렸습니다.');
        // return;
        };
    } else {
        console.log('신규');
        pw1 = prompt('신규 가입중...\n비밀번호를 다시 한번 입력해주세요.');
        start_encrypte(pw1);
        let encrypted_temp1 = encrypted;
        start_encrypte(pw);
        let encrypted_temp2 = encrypted;
        console.log(`${encrypted_temp1}, ${encrypted_temp2}`);
        if(pw1 == null){
        console.log('가입 취소됨.')
        restart_function = 1;
        // return;
        } else if(window.localStorage.getItem(encrypted_temp1) == true){
        alert('사용 불가능한 비밀번호입니다.');
        restart_function = 1;
        return;
        } else if(encrypted_temp1 == encrypted_temp2){
        // window.localStorage.setItem(name, pw);
        cookie('login', 'w', name, pw);
        console.log('완료');
        alert('가입이 완료되었습니다. 본 계정은 본 기기에 한하여 사용이 가능합니다.')
        } else {
        console.log('비밀번호 틀림');
        restart_function = 1;
        alert('비밀번호가 틀렸습니다.');
        return;
        };
    };
    if(restart_function == 1){
        restart_function = 0;
        console.log('restart!');
        login(n);
    } else {
        record(n, name, pw);
    };
    // return;
    } else {
    return;
    };
    if(restart_function == 1){
    restart_function = 0;
    console.log('restart!');
    login(n);
    };
}, 100);;
}
/*if(restart_function == 1){
restart_function = 0;
login(n);
};*/
function record(n, name, pw){
console.log('기록 시작');
if(name === null || pw === null) {
    alert('기록이 취소되었습니다.');
    console.log('취소!');
    return;
};
// start_encrypte(pw);
if(!window.localStorage.getItem(encrypted)) {
    console.log('첫번째 기록!');
    // window.localStorage.setItem(pw,n);
    start_encrypte(pw);
    cookie('record','w',pw,n);
    console.log('기록 완료!');
    alert('기록을 성공적으로 끝마쳤습니다!');
} else{
    console.log('이전의 기록 발견!');
    start_encrypte(pw);
    cookie('login','c',name,pw);
    cookie_record(encrypted_login,score);
    const prev = window.localStorage.getItem(encrypted_record);
    if(prev < n){
    // window.localStorage.setItem(pw,n);
    cookie('record','w',pw,n);
    console.log('최고기록 달성!');
    alert(n+'점\n최고기록 달성!\n축하드립니다!!🎉🎉');
    console.log('완료');
    alert('기록을 성공적으로 끝마쳤습니다!');
    } else if(prev > n){
    const prev_temp = prev-n;
    alert(prev_temp+'점 차이로 아쉽게 실패!');
    const want_record = confirm('기록을 갱신 하시겠습니까?');
    if(want_record){
        if(confirm('기존기록은 삭제 됩니다.\n그래도 하시겠습니까?')){
        // window.localStorage.setItem(pw,n);
        cookie('record','w',pw,n);
        console.log('완료');
        alert('기록을 성공적으로 끝마쳤습니다!');
        } else{
        console.log('cancled');
        };
        return;
    } else{
        return;
    };
    } else{
    console.log('동점!')
    alert(n+'점으로 동점입니다.')
    };
};
}
