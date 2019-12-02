
var gNums = [];
var gCount = 1;
var gSize = 16;
var gTimeInterval;
function init(size) {
    createNums(size);
    gNums = shuffleNums(size);
    var rows = Math.sqrt(size);
    renderBoard(rows);
}

function createNums(size) {
    for (var i = 0; i < size; i++) {
        gNums[i] = i + 1;
    }
}

function shuffleNums(size) {
    var nums = [];
    while (size > 0) {
        var rndNum = Math.floor(Math.random() * size);
        nums.push(gNums.splice(rndNum, 1));
        size--;
    }
    return nums;
}

function renderBoard(size) {
    var elBoard = document.querySelector('.board');
    var sHtml = '';
    for (var i = 0; i < size; i++) {
        sHtml += `<tr>\n`;
        for (var j = 0; j < size; j++) {
            var strData = `data-i= "${i}" data-j="${j}"`;
            sHtml += `\t<td ${strData} onclick="cellClicked(this)">${gNums.pop()}</td>\n`;
        }
        sHtml += `</tr>\n`;
    }
    elBoard.innerHTML = sHtml;
}

function showTime(start) {
    var time = ((Date.now() - start) / 1000).toString().substr(0, 5);
    var sHtml = `<div class:"stopWatch">${time}</div>`;
    document.querySelector('.stopWatch').innerHTML = sHtml;
}

function cellClicked(clickedNum) {
    if (clickedNum.innerText == 1 && gCount === 1) {
        var start = Date.now();
        gTimeInterval = setInterval(function () {
            showTime(start)
        }, 55);
    }
    if (clickedNum.innerText == gCount) {
        clickedNum.classList.add('painted');
        gCount++;
    }
    if(gCount===gSize+1){
        clearInterval(gTimeInterval);
    }
}
function changeDifficulty(elSettings) {
    switch (elSettings.innerText) {
        case 'Easy': clearInterval(gTimeInterval); gCount = 1; gSize = 16; init(gSize); break;
        case 'Medium': clearInterval(gTimeInterval); gCount = 1; gSize = 25; init(gSize); break;
        case 'Hard': clearInterval(gTimeInterval); gCount = 1; gSize = 36; init(gSize); break;
    }
}
