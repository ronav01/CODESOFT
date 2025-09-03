let display = document.querySelector(".display");

let allBtn = document.querySelectorAll('input[type="button"]');

// for allButton to acces
allBtn.forEach(button => {
  button.addEventListener("click", () => {
    let value = button.value;

    //operator consition

    if (value === 'Ac') {
      display.value = '0';
    } else if (value === 'DL') {
      display.value = display.value.slice(0, -1) || '0';
    } else if (value === '%') {
      display.value = parseFloat(display.value) / 100;
    } else if (value === '=') {
      let expression = display.value.replace(/x/g, '*');
      try {
        display.value = eval(expression);
      } catch {
        display.value = "Error";
      }
    } else {
      if (display.value === '0' || display.value === 'Error') {
        display.value = value;
      } else {
        display.value += value;
      }
    }
  });
});

// keybord input

document.addEventListener('keydown',(event)=>{
    let key = event.key;

    let validKey = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','%'];

    if(validKey.includes(key)){
        if(display.value === '0'||display.value ==='Error'){
            display.value = key;
        }else{
            display.value += key;
        }
    }else if (key === 'Enter'){
        try{
            let result = display.value = eval(display.value);
            return result;
           
        }catch{
            display.value = 'Error';
        }
    } else if (key === 'Backspace'){
        display.value = display.value.slice(0,-1)||'0';
    }else if(key === 'Escape'){
        display.value = '0';
    }
});

// for dark mode 
let darkMOde = document.querySelector("#dark-toggle");
let container = document.querySelector(".container");
let operatorBtns = document.querySelectorAll(".operator");

darkMOde.addEventListener("change", () => {
  if (darkMOde.checked) {
    container.classList.add("dark-container");
    display.style.color = "white";

    operatorBtns.forEach(btn => {
  btn.classList.add("dark-operator");
});
  } else {
    container.classList.remove("dark-container");
    display.style.color = "black";

   operatorBtns.forEach(btn => {
  btn.classList.add("dark-operator");
 });
  }
});




