let end = 0;
let lose = 0;
let only_move = 1;
let removedAllEventListener = 0;
const $btnup = document.getElementById('btnup');
const $btndn = document.getElementById('btndn');
const $btnlt = document.getElementById('btnlt');
const $btnrt = document.getElementById('btnrt');
const $NotWork = document.getElementById('NotWork');
const congratulation_audio = new Audio('congratulation.wav');
const move_audio = new Audio('swoosh.mp3');
const lose_audio = new Audio('2048Lose_Mastering.wav');
const added = new Audio('pop.flac');
const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.getElementById('back');
const $hmr = document.getElementById('how_many_remain');
const $set_fail = document.getElementById('Fail');
const $record = document.getElementById('record');
const $info = document.getElementById('information');
const $NotWorkGroup = document.getElementById('NotWorkGroup');
let how_many = 3;
let how_many_temp;
let data = [];
const history = [];

function removeAllEventListener(){
    window.removeEventListener('keyup', key, false); // 패배시 이벤트 리스너 제거.
    window.removeEventListener('mousedown', mousedown, false); // 패배시 이벤트 리스너 제거.
    window.removeEventListener('mouseup', mouseup, false); // 패배시 이벤트 리스너 제거.
    $table.removeEventListener('touchstart', touchstart, false); // 패배시 이벤트 리스너 제거.
    $table.removeEventListener('touchend', touchend, false); // 패배시 이벤트 리스너 제거.
    removedAllEventListener = 1;
};

let el;

function capture(v){
html2canvas(document.body).then(function(canvas) {
    if(confirm('스크린샷을 내려 받을까요?')){
    el = document.getElementById("target");
    el.href = canvas.toDataURL("image/jpeg");
    el.download = '2048_complete.jpg';
    el.click();
    setTimeout(() => {
        if(v == 1){
            try {
                window.opener.postMessage({score:$score.textContent,win:1}, '*');
                close();
            } catch (error) {
                console.log(error);
                if (infinity_mode == 0) {
                if (confirm('무한모드를 활성화 하시겠습니까?')){
                    infinity_mode = 1;
                    $info.textContent = 'infinity mode enabled.';
                    $info.style.color = 'blue';
                } else {
                    infinity_mode = -1;
                };
                };
            };
        } else if(v == 0){
            try {
                window.opener.postMessage({score:$score.textContent,win:0}, '*');
                close();
            } catch (error) {
                console.log(error);
                if (infinity_mode == 0) {
                if (confirm('무한모드를 활성화 하시겠습니까?')){
                    infinity_mode = 1;
                    $info.textContent = 'infinity mode enabled.';
                    $info.style.color = 'blue';
                } else {
                    infinity_mode = -1;
                };
                };
            };
        };
    },1000);
    } else {
    if(v == 1){
        try {
            window.opener.postMessage({score:$score.textContent,win:1}, '*');
            close();
        } catch (error) {
            console.log(error);
            if (infinity_mode == 0) {
            if (confirm('무한모드를 활성화 하시겠습니까?')){
                infinity_mode = 1;
                $info.textContent = 'infinity mode enabled.';
                $info.style.color = 'blue';
            } else {
                infinity_mode = -1;
            };
            };
        };
    } else if(v == 0){
        try {
            window.opener.postMessage({score:$score.textContent,win:0}, '*');
            close();
        } catch (error) {
            console.log(error);
            if (infinity_mode == 0) {
            if (confirm('무한모드를 활성화 하시겠습니까?')){
                infinity_mode = 1;
                $info.textContent = 'infinity mode enabled.';
                $info.style.color = 'blue';
            } else {
                infinity_mode = -1;
            };
            };
        };
    };
    };
});
};

function record(n, name, pw){
console.log('기록 시작');
if(name === null || pw === null) {
    alert('기록이 취소되었습니다.');
    console.log('취소!');
    return;
};
if(!window.localStorage.getItem(pw)) {
    console.log('첫번째 기록!');
    window.localStorage.setItem(pw,n);
    console.log('기록 완료!');
} else{
    console.log('이전의 기록 발견!');
    const prev = window.localStorage.getItem(pw);
    if(prev < n){
    window.localStorage.setItem(pw,n);
    console.log('최고기록 달성!');
    alert(n+'점\n최고기록 달성!\n축하드립니다!!🎉🎉');
    console.log('완료');
    } else if(prev > n){
    const prev_temp = prev-n;
    alert(prev_temp+'점 차이로 아쉽게 실패!');
    const want_record = confirm('기록을 갱신 하시겠습니까?');
    if(want_record){
        if(confirm('기존기록은 삭제 됩니다.\n그래도 하시겠습니까?')){
        window.localStorage.setItem(pw,n);
        console.log('완료')
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

function login(n){
let restart_function = 0
console.log(n+'점을 기록.');
const name = prompt('당신의 닉네임을 작성해주세요.');
if(name == null) {
    alert('기록이 취소되었습니다.');
    return;
};
const pw = prompt('비밀번호를 입력해주세요');
if(pw == null) {
    alert('기록이 취소되었습니다.');
    return;
};
console.log(pw);
if(name){
    console.log('닉네임: ' + name);
    let name_list = false;
    if(window.localStorage.getItem(name)){
    name_list = window.localStorage.getItem(name);
    console.log(String(name_list)+String(pw));
    if(name_list == true){
        console.log('가입필요.');
        pw1 == prompt('신규 가입중...\n비밀번호를 다시 한번 입력해주세요');
        if(pw == pw1){
        window.localStorage.setItem(name, pw);
        console.log('완료');
        } else{
        console.log('비밀번호 틀림');
        alert('비밀번호가 틀렸습니다.');
        restart_function = 1
        // login(n);
        };
    } else if(name_list == pw){
        console.log('기록 되어있는 닉네임.');
    } else{
        console.log('비밀번호 틀림');
        alert('비밀번호가 틀렸습니다.');
        restart_function = 1
        // login(n);
    };
    } /*else if(pw != pw1){
    console.log('비밀번호 틀림');
    alert('비밀번호가 틀렸습니다.');
    login(n);
    }*/ else {
    console.log('신규');
    const pw1 = prompt('신규 가입중...\n비밀번호를 입력해주세요');
    if(pw == pw1){
        window.localStorage.setItem(name, pw);
        console.log('완료');
        alert('가입이 완료되었습니다. 본 계정은 본 기기에 한하여 사용이 가능합니다.')
    } else{
        console.log('비밀번호 틀림');
        alert('비밀번호가 틀렸습니다.');
        restart_function = 1
    }
    };
    if(restart_function == 1){
    login(n);
    }
    else{
    record(n, name, pw);
    };
    // return;
} else{
    return;
}
if(lose == 1){
    removeAllEventListener;
};
}

function restore(n){
console.log('되돌리기 요청됨.')
if(how_many == 0){
    $hmr.textContent = '되돌릴수 없습니다.'
    $hmr.style.color = 'red'
    console.log('되돌리기 취소됨.')
    if (n === 1){
    alert('되돌릴수 없습니다.');
    console.log('Notifaction was completed with Pop Up Message.');
    const confirm_record = confirm('점수를 기록 하시겠습니까?');
    if(confirm_record){
        // login(`${$score.textContent}`);
        set_fail();
    } else{
        return;
    };
    };
    return;
} else{
    console.log('승인!')
    const prevData = history.pop();
    if (!prevData) return; // 되돌릴 게 없으면 종료
    how_many = how_many - 1
    how_many.toString;
    how_many_temp = how_many + '회 남음';
    $score.textContent = prevData.score;
    $hmr.textContent = how_many_temp
    data = prevData.table;
    draw();
    console.log('완료!')
}
}
let infinity_mode = 0
function set_fail(n) {
if (infinity_mode != 1){
    end = 1;
    lose = 1;
    alert(`패배했습니다... ${$score.textContent}점`);
    // if(n == 'manual') login(`${$score.textContent}`); // 수동으로 포기 할시 바로 기록여부 확인 후 종료.
    const yesOrNo = confirm('한턴을 되돌리시겠습니까?');
    console.log('패배\n\n되돌리기 = ' + yesOrNo);
    if(yesOrNo){
    restore(n);
    } else{
    /*
    let url = new URL(window.location.href);
    console.log(url)
    url = url.toString();
    // let temp = 
    let splited = url.substr(0, -9);
    url = splited + '2048_Result.html';
    console.log(url)
    // var child = frames[0];
    window.open('http://127.0.0.1:5500/2048_Result.html').postMessage($score.textContent, 'http://127.0.0.1:5500/2048_Result.html');
    window.open("/2048_Result.html");
    window.close();
    // location.replace(url)
    // login(`${$score.textContent}`);
    */
    try {
        /*window.opener.postMessage({score:$score.textContent,win:0}, '*');
        close();*/
        capture(0);
    } catch (error) {
        console.log(error);
        if (infinity_mode == 0) {
        if (confirm('무한모드를 활성화 하시겠습니까?')){
            infinity_mode = 1;
            $info.textContent = 'infinity mode enabled.';
            $info.style.color = 'blue';
        } else {
            infinity_mode = -1;
        };
        };
    };
    }
    /*
        lose_audio.currentTime = 0;
        lose_audio.play();
    $info.textContent = 'LOSE!';
    $info.style.color = 'red';
    */
} else {
    if (infinity_mode == 0) {
    if (confirm('무한모드를 활성화 하시겠습니까?')){
        infinity_mode = 1;
        $info.textContent = 'infinity mode enabled.';
        $info.style.color = 'blue';
    } else {
        infinity_mode = -1;
    };
    }
}
}

function complete(n){
end = 1;
congratulation_audio.play();
if (infinity_mode == 0) {
    alert('🎉🎉🎉\n축하합니다. 2048을 만들었습니다!\n🎉🎉🎉');
    /*if(confirm('스크린샷을 저장 하시겠습니까?')){
        capture(1);
    } else{
        window.opener.postMessage({score:$score.textContent,win:1}, '*')
        close();
    };*/
    capture(1);
    // login(n);
}
}

$set_fail.addEventListener('click', () => {
set_fail('manual');
})

$back.addEventListener('click', () => {
restore();
})


// $table -> $fragment -> $tr -> $td
function startGame() {
    const $fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
        rowData.push(0);
        const $td = document.createElement('td');
        $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
    });
    $table.appendChild($fragment);
    put2ToRandomCell();
    draw();
}

function put2ToRandomCell() {
const emptyCells = []; // [[i1, j1], [i2, j2], [i3, j3]]
data.forEach(function (rowData, i) {
    rowData.forEach(function (cellData, j) {
    if (!cellData) {
        emptyCells.push([i, j]);
    }
    });
});
// randomCell === [i, j]
const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
    data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
        const $target = $table.children[i].children[j];
        if (cellData > 0) {
        $target.textContent = cellData;
        $target.className = 'color-' + cellData;
        } else {
        $target.textContent = '';
        $target.className = '';
        }
    });
    });
}

startGame();
/*
data = [
    [32, 2, 4, 2],
    [64, 4, 8, 4],
    [2, 1024, 1024, 32],
    [32, 16, 64, 4],
];
draw();
*/
function moveCells(direction) {
history.push({
    table: JSON.parse(JSON.stringify(data)),
    score: $score.textContent,
});
switch (direction) {
    case 'left': {
    const newData = [[], [], [], []];
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
        if (cellData) { // newData = [2, 2, 4]
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
            only_move = 0;
            added.currentTime = 0;
            added.play();
            } else {
            newData[i].push(cellData); 
            }
        }
        });
    });
    console.log(newData);
    [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
        data[i][j] = Math.abs(newData[i][j]) || 0;
        });
    });
    break;
    }
    case 'right': {
    const newData = [[], [], [], []];
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
        if (rowData[3 - j]) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === rowData[3 - j]) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
            only_move = 0;
            added.currentTime = 0;
            added.play();
            } else {
            newData[i].push(rowData[3 - j]);
            }
        }
        });
    });
    console.log(newData);
    [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
        data[i][3 - j] = Math.abs(newData[i][j]) || 0;
        });
    });
    break;
    }
    case 'up': {
    const newData = [[], [], [], []];
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
        if (cellData) {
            const currentRow = newData[j]
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
            only_move = 0;
            added.currentTime = 0;
            added.play();
            } else {
            newData[j].push(cellData);
            }
        }
        });
    });
    console.log(newData);
    [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
        data[j][i] = Math.abs(newData[i][j]) || 0;
        });
    });
    break;
    }
    case 'down': {
    const newData = [[], [], [], []];
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
        if (data[3 - i][j]) {
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === data[3 - i][j]) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
            only_move = 0;
            added.currentTime = 0;
            added.play();
            } else {
            newData[j].push(data[3 - i][j]);
            }
        }
        });
    });
    console.log(newData);
    [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
        data[3 - j][i] = Math.abs(newData[i][j]) || 0;
        });
    });
    break;
    }
}
if (data.flat().includes(2048)) { // 승리
    draw();
    setTimeout(() => {
    complete(2048);  
    }, 0);
    // login($score.testContent)
} else if (!data.flat().includes(0)) { // 빈 칸이 없으면 패배
    set_fail(1);
    // alert(`패배했습니다... ${$score.textContent}점`);
} else {
    put2ToRandomCell();
    draw();
};
if (only_move == 1) {
    move_audio.currentTime = 0.001;
    move_audio.play();
} else if (removedAllEventListener == 1) {
    move_audio.currentTime = 0;
    only_move = 0;
} else {
    only_move = 1;
};
}

function key(event){ // 키보드 이벤트 처리
if (event.key === 'ArrowUp') {
    if (removedAllEventListener == 0) {
    moveCells('up');
    };
} else if (event.key === 'ArrowDown') {
    if (removedAllEventListener == 0) {
    moveCells('down');
    };
} else if (event.key === 'ArrowLeft') {
    if (removedAllEventListener == 0) {
    moveCells('left');
    };
} else if (event.key === 'ArrowRight') {
    if (removedAllEventListener == 0) {
    moveCells('right');
    };
}
};

window.addEventListener('keyup', key); // 키보드 키 누른뒤 손땠을때 기준으로 이벤트 리스너 추가

let startCoord;
function mousedown(event){ // 마우스 시작점 기록
startCoord = [event.clientX, event.clientY];
};

function mouseup(event){ // 마우스 종료 위치 기록및 차이점으로 cell이동 여부 및 이동 방향 결정
const endCoord = [event.clientX, event.clientY];
const diffX = endCoord[0] - startCoord[0];
const diffY = endCoord[1] - startCoord[1];
if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    if (removedAllEventListener == 0){
    moveCells('left');
    };
} else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    if (removedAllEventListener == 0){
    moveCells('right');
    };
} else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    if (removedAllEventListener == 0){
    moveCells('down');
    };
} else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    if (removedAllEventListener == 0){
    moveCells('up');
    };
} 
};

function touchstart(event){ // 터치 시작점 기록
startCoord = [event.touches[0].clientX, event.touches[0].clientY];
};

function touchend(event){ // 터치 종료 위치 기록및 차이점으로 cell이동 여부 및 이동 방향 결정
const endCoord = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
const diffX_touch = endCoord[0] - startCoord[0];
const diffY_touch = endCoord[1] - startCoord[1];
if (diffX_touch < 0 && Math.abs(diffX_touch) > Math.abs(diffY_touch)) {
    if (removedAllEventListener == 0){
    moveCells('left');
    };
} else if (diffX_touch > 0 && Math.abs(diffX_touch) > Math.abs(diffY_touch)) {
    if (removedAllEventListener == 0){
    moveCells('right');
    };
} else if (diffY_touch > 0 && Math.abs(diffX_touch) <= Math.abs(diffY_touch)) {
    if (removedAllEventListener == 0){
    moveCells('down');
    };
} else if (diffY_touch < 0 && Math.abs(diffX_touch) <= Math.abs(diffY_touch)) {
    if (removedAllEventListener == 0){
    moveCells('up');
    };
}
};


window.addEventListener('mousedown', mousedown, false); // 마우스 버튼 입력 시작 감지

window.addEventListener('mouseup', mouseup, false); // 마우스 버튼 입력 중지 감지

window.addEventListener('touchstart', touchstart, false); // 터치 시작 감지

window.addEventListener('touchend', touchend, false);

function moveup(){
moveCells('up');
};
function movedn(){
moveCells('down');
};
function movelt(){
moveCells('left');
};
function movert(){
moveCells('right');
};

$btnup.addEventListener('click', moveup, false);
$btndn.addEventListener('click', movedn, false);
$btnlt.addEventListener('click', movelt, false);
$btnrt.addEventListener('click', movert, false);