// for making a horizontal scroll

const scrollBox = document.getElementById("scroll-boxes");
    document.getElementById("scroll-left").onclick = () => {
        scrollBox.scrollBy({ left: -300, behavior: 'smooth' });
    };
    document.getElementById("scroll-right").onclick = () => {
        scrollBox.scrollBy({ left: 300, behavior: 'smooth' });
    };


    const scrollBox2 = document.querySelectorAll(".scroll-box2");

        scrollBox2.forEach(box => {
        box.addEventListener("mouseover", () => {
            
                box.style.width = "400px";
                box.style.height = "250px";
            
        });
    });



// for image hover effect

    scrollBox2.forEach(box => {
        box.addEventListener("mouseout", () => {
            
                box.style.width = "250px";
                box.style.height = "200px";   
        });
    });
    



// for nav bar scroll
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Allow normal navigation for external or route links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});






  // for feedback

  const faqBox = document.querySelectorAll(".faq-box");

  faqBox.forEach(box => {
  box.addEventListener("mouseover", () => {
      
          box.style.width = "450px";
          box.style.fontSize = "21px"
          //box.style.height = "150px";
      
  });
});


faqBox.forEach(box => {
  box.addEventListener("mouseout", () => {
          box.style.width = "400px";
          box.style.fontSize = "18px";
  });
});







const boxes = document.querySelectorAll(".Box");

function checkBoxes(){
  const triggerBottom = window.innerHeight - 100;

  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if(boxTop < triggerBottom) {
      box.classList.add("visible");
    }else{
      box.classList.remove("visible");
    }

  });

}



window.addEventListener('hashchange', ()=>{
  if(window.location.hash === '#about'){
    Element.classList.add('visible');
  }else{
    Element.classList.remove('visible');
  }

});

