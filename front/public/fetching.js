  const form = document.getElementById("add-data-form");


function add_card(){

    form.addEventListener("submit", function(e) {
  
      e.preventDefault();
  
      const word = document.getElementById('word').value;
      const definition = document.getElementById('definition').value;
  
      const data = {
          "word": word,
          "definition": definition,
      };
    
      fetch(`http://${url}:3222/products/name/${name_swiper}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data), 
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
            
              return response.json(); 
              
          })
          .then((updatedProduct) => {
            alert("เรียบร้อยค่ะเตง")
              console.log('Product updated:', updatedProduct);
  
          })
          .catch((error) => {
              console.error('Error:', error);
      
          });
  
      })
}
  

function remove_card(){


  
      const word = document.getElementById('word_on_card').innerHTML;
      const definition = document.getElementById('definition_on_card').innerHTML;
  
      const data = {
          "word": word,
          "definition": definition,
      };
      console.log(`${word}, ${definition}`);
      fetch(`http://${url}:3222/products/name/${name_swiper}/remove`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data), 
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
            
              return response.json(); 
              
          })
          .then((updatedProduct) => {
            alert("ลบเรียบร้อยแล้วค่ะเตง")
              console.log('Product updated:', updatedProduct);
  
          })
          .catch((error) => {
              console.error('Error:', error);
      
          });
  
    
}
  