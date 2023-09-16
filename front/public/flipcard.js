let is_draging = false;
let x_begin,y_begin;
let x,y;
let is_left,is_right = false;
let cnt_correct = 0;
let cnt_incorrect = 0;

const screenWidth = window.innerWidth;
const threshold = 0.2 * screenWidth;


const card = document.getElementById("card-main")

card.addEventListener('mousedown', (e) => {
    is_draging = true;
    card.style.transition = "none";
    x_begin = e.clientX;
    y_begin = e.clientY;
  });

  card.addEventListener('mousemove', (e) => {
    if (!is_draging) return;
    x = e.clientX - x_begin;
    y = e.clientY - y_begin;
    card.style.transform = `translate(${x}px, ${y}px)`;
    //console.log(x)
    if (x < -threshold) {
      is_left = true;
      //console.log("Card is being dragged to the left");
  } else if (x > threshold) {
      is_right = true;
      //console.log("Card is being dragged to the right");
  } else {
      is_right = false;
      is_left = false;
      //console.log("Card is in the center");
  }
  });

//   card.addEventListener('mouseleave', (e) => {
//     if (!is_draging) return;
//     card.style.transition = 'transform 0.3s ease-in-out';
//     card.style.transform = `translate(0, 0)`;
//     is_draging = false;
//     alert("ใจเย็นพี่ไม่ต้องรีบ");
//   });
  
  card.addEventListener('mouseup', (e) => {
    if (!is_draging) return;
    if(is_left){
      cnt_correct++;
      card.remove();
    //   summary(card.getAttribute("id"),data[0].words.length-1);

    }else if(is_right){
      cnt_incorrect++;
      card.remove();
    //   summary(card.getAttribute("id"),data[0].words.length-1);
    }

    // document.getElementById(`card-num-${id}`).remove();
    // id--;
    // document.getElementById(`card-num-${id}`).style.display = "block";
    // document.querySelector(`#card-num-${id}`).style.display = "block";
    

    card.style.transition = 'transform 0.3s ease-in-out';
    card.style.transform = `translate(0, 0)`;
    is_draging = false;
  });



var d = document.querySelector('div');
var dtime;
var i;


d.onmousedown = function () {
window.addEventListener('mouseup', mouseUpCheck);
dtime = new Date();
i = setInterval(function () {
    if (dtime) {
    var t = new Date();
    if (t.getTime() - dtime.getTime() >= 2000) {
        dtime = null; //stop now..
        console.log('2 second mousedown');
    }
    }
}, 50);
}
function mouseUpCheck() {
dtime = null;
window.removeEventListener('mouseup', mouseUpCheck);   
clearInterval(i);
}