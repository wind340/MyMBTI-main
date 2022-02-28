const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function calResult(){
    var result = select.indexOf(Math.max(...select));
        return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-'+point+'.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    //페이드아웃 효과
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    //setTimeout으로 사라지는 1초동안 
    setTimeout(()=>{
        //qna 페이드인
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        //페이드인이 완료될때까지 0.45초동안 페이지 교체
        setTimeout(()=>{
            qna.style.display="none";
            result.style.display="block";
        },450)})
        setResult();
}


function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            var target = qnaList[qIdx].a[idx].type;
            for(let i=0; i < target.length; i++){
                select[target[i]]+=1;
            }
            for(let i=0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    //qIdx를 받아와서 qBox클래스 지정하고 q 변수로 저장
    var q = document.querySelector('.qBox');
    //q 안에 qnaList[0]번째.질문부터 가져옴
    q.innerHTML = qnaList[qIdx].q;
    //반복문을 통해 answer의 총 개수만큼 가져오기
    for(let i=0; i<qnaList[qIdx].a.length; i++){
        addAnswer(qnaList[qIdx].a[i].answer , qIdx , i);//addAnswer의 함수지정
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}


function begin(){
    //페이드아웃 효과
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    //setTimeout으로 사라지는 1초동안 
    setTimeout(()=>{
        //qna 페이드인
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        //페이드인이 완료될때까지 0.45초동안 페이지 교체
        setTimeout(()=>{
            main.style.display="none";
            qna.style.display="block";
        },450)
        // qIdx를 통해 첫 질문지를 넘겨준다
        let qIdx = 0;
        goNext(qIdx);
    },450);
}