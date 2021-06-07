let items = document.querySelectorAll(".parallax");

document.addEventListener("mousemove", parallax);

function parallax(e){
    for (let i of items) {
        // console.dir(i);
        let WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight,
            SPEED = i.dataset.speed,
            {pageX, pageY} = e;
        pageX = (WIDTH / 2) - pageX;
        pageY = (HEIGHT / 2) - pageY;
        i.style.transform = `translate(${pageX / 500 * SPEED}px, ${pageY / 500 * SPEED}px)`;
    }
}