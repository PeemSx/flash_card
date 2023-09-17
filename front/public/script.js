// import { draggingFunc } from "./card.js";

const container = document.querySelector(".flash-card-section");
const footer_card = document.querySelector("#center-section #footer-center")
let is_draging = false;
let x_begin,y_begin;
let x,y;
let is_left,is_right = false;
let cnt_correct = 0;
let cnt_incorrect = 0;
let id;
var dtime;
var i;
let isFlip = false;
let idx_card;
const idx_doc = 4;

const url = "localhost";
const summary_section = document.querySelector(".summary");
let name_swiper
const screenWidth = window.innerWidth;
const threshold = 0.2 * screenWidth;
fetch(`http://${url}:3222/products/`)
  .then((res) => {
    if (res.ok) {
      console.log("Success");
      return res.json();
    } else {
      throw new Error("HTTP Error: " + res.status);
    }
  })
  .then((data) => {
    console.log(data[idx_doc].wordDefinitions[0].word);
    
    id = 0;
    name_swiper = data[idx_doc].name;
    appendCard(data,id);
   
  })
  .catch((error) => {
    console.error("Error", error);
  });

function appendCard(data,i){
  is_right = false;
  is_left = false;
  const card_name = document.querySelector(".card-name");
    const appendElem = document.createElement("h2");
    appendElem.innerHTML = `${data[idx_doc].name}`;
    if(i == id){
      card_name.appendChild(appendElem);
    }
    const swiper = document.querySelector(".swiper");

      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.setAttribute("id", `card-num-${i}`);


      card.innerHTML = `<div class="flip-card-inner"> 
                          <div class="flip-card-front">
                            <h1>${data[idx_doc].wordDefinitions[i].word}</h1>
                            <p>This is the front side of the card.</p>
                          </div>
                          <div class="flip-card-back">
                            <h1>${data[idx_doc].wordDefinitions[i].definition}</h1>
                            <p>This is the back side of the card.</p>
                          </div>
                        </div>`
      
      swiper.appendChild(card);
   
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
  
          if (x < -threshold) {
            is_left = true;
 
          } else if (x > threshold) {
              is_right = true;
          
          } else {
              is_right = false;
              is_left = false;

          }
        });
      
        card.addEventListener('mouseleave', (e) => {
          if (!is_draging) return;
          card.style.transition = 'transform 0.3s ease-in-out';
          card.style.transform = `translate(0, 0)`;
          is_draging = false;
          //alert("ใจเย็นพี่ไม่ต้องรีบ");
        });
        
        card.addEventListener('mouseup', (e) => {
    
          if (!is_draging) return;
          if(is_left){
            cnt_correct++;
            card.remove();
            summary(card.getAttribute("id"),data[idx_doc].wordDefinitions.length-1);
            if(i < data[idx_doc].wordDefinitions.length-1){
              i++;
              appendCard(data,i);
            }

          }else if(is_right){
            cnt_incorrect++;
            card.remove(); 
           
            summary(card.getAttribute("id"),data[idx_doc].wordDefinitions.length-1);
            if(i < data[idx_doc].wordDefinitions.length-1){
              i++;
              appendCard(data,i);
            }      
          }
          card.style.transition = 'transform 0.3s ease-in-out';
          card.style.transform = `translate(0, 0)`;
          is_draging = false;
        });

}

function summary(index,words_limit){

  if(index == `card-num-${words_limit}`){

    console.log("This is the last card");

    const correct_text = document.querySelector("#correct-score");
    const incorrect_text = document.querySelector("#incorrect-score");

    correct_text.innerHTML = `${cnt_correct}`;
    incorrect_text.innerHTML = `${cnt_incorrect}`;

  }


}
  
