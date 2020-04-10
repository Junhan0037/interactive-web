(function() {

    const stageElem = document.querySelector('.stage')
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const mousePos = {x:0, y:0};
    let maxScrollValue; // 스크롤

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight; // body전체 높이 - 창 스크롤바 크기
    }

    window.addEventListener('scroll', function() {
        const scrollPer = pageYOffset / maxScrollValue; // 현재 스크롤의 비율
        const zMove = scrollPer * 980 -490; // 1~980범위, house의 기본값 translateZ(-490vw);를 빼줘서 자연스럽게
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        // progress bar
        barElem.style.width = scrollPer * 100 + '%';
    });

    window.addEventListener('mousemove', function(e) { // e.clientX : 현재 x축 커서 위치
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2; // 중앙이 (0,0)이 되게 계산
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) +'deg) rotateY(' + (mousePos.x * 5) + 'deg)'; // 곱하기 5를 통해 시선이동 변화를 크게 만듬
    });

    window.addEventListener('resize', resizeHandler); // 창사이즈 변경 시 이벤트 호출
    resizeHandler(); // 초기 스크롤 갱신

})();