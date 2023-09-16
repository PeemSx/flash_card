function draggingFunc(id){


    const card = document.querySelector(".card");
    
    let is_draging = false;
    let x_begin,y_begin;
    let x,y;
    
    card.addEventListener('mousedown',(e) =>{
        is_draging = true;
        card.style.transition = "none";
        x_begin = e.clientX;
        y_begin = e.clientY;
    
    
    });
    
    card.addEventListener('mousemove',(e) =>{
        if(!is_draging) return;
    
        x = e.clientX - x_begin;
        y = e.clientY - y_begin;
    
        card.style.transform = `translate(${x}px, ${y}px)`

        console.log(`X: ${x}px, Y: ${y}px`);
        
    
    });
    
    card.addEventListener('mouseup',(e) =>{
        if(!is_draging) return;
    
        card.style.transition = 'transform 0.3s ease-in-out';
        card.style.transform = `translate(0, 0)`
    
        is_draging = false;
    
    
    });

}    

export {draggingFunc};

