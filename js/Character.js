function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);

    this.mainElem.style.left = info.xPos + '%'; // 왼쪽을 기준으로 위치지정
    // 스크롤 중인지 아닌지 확인
    this.scrollState = false;
    // 바로 이전 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos; // 각 객체에 위치생성
    this.speed = info.speed; // ilbuni 스피드
    this.direction; // 방향
    this.reunningState = false; // 좌,우 이동중 인지 아닌지
    this.rafId; // requestAnimationFrame
    this.init();
}

Character.prototype = {
    constructor: Character, // 생성자 재정의
    init: function() {
        const self = this; // this.mainElem을 사용하기 위해 변수 새로 지정 (function안에서는 this사용 X)

        window.addEventListener('scroll', function() { // scroll이 움직이면 실행되는 이벤트
            clearTimeout(self.scrollState); // setTimeout을 취소시킴, self.scrollState에 값이 반복해서 들어오는걸 한번만 실행시켜준다
            
            if(!self.scrollState) { // setTimeout에 의해 숫자가 들어오면 실행X
                self.mainElem.classList.add('running');
            }
            
            self.scrollState = setTimeout(function() { // setTimeout : 숫자를 반환, 0/5초뒤 실행 
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500); // 0.5초 뒤에 실행되려고 하지만 clearTimeout에 의해 실행되지 못함 => 스크롤이 끊나야 실행!

            //이전 스크롤 위치와 현재 스크롤 위치 비교
            if(self.lastScrollTop > pageYOffset) {
                // 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward'); // 뒤로 움직임
            } else {
                // 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward'); // 앞으로 움직임
            }

            self.lastScrollTop = pageYOffset; // 바로 이전 스크롤 위치 저장

        });

        window.addEventListener('keydown', function(e) { // 키보드 입력 시 실행되는 이벤트
            if(self.reunningState) {
                return;
            }
            if (e.keyCode == 37) {
                // 왼쪽키
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left'); // css
                self.mainElem.classList.add('running');
                self.run(self);
                self.reunningState = true;
            } else if (e.keyCode == 39) {
                // 오른쪽키
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                self.reunningState = true;
            }
        });

        window.addEventListener('keyup', function(e) { // 키보드 입력 종료 시 실행되는 이벤트
            self.mainElem.classList.remove('running');
            this.cancelAnimationFrame(self.rafId); // requestAnimationFrame 취소시킴
            self.reunningState = false; // 다시 키보드 입력 시 움직이게 하기 위해 초기화
        });
    },
    run : function(self) {
        if(self.direction == 'left') {
            self.xPos -= self.speed;
        } else if (self.direction == 'right') {
            self.xPos += self.speed;
        }

        if(self.xPos < 2) { // 양쪽 끝을 안넘어가게 설정
            self.xPos = 2;
        } else if(self.xPos > 88) {
            self.xPos = 88;
        }

        self.mainElem.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function() { // 'keyup'이벤트의 반복속도 늦기 때문에 requestAnimationFrame으로 반복실행
            self.run(self);
        });
    }
};