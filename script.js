let div = document.getElementById("selectedColor");
let table = document.getElementById("table");

let tr1 = document.getElementById("tr1");
let tr2 = document.getElementById("tr2");
let th1 = document.getElementById("th1");
let th2 = document.getElementById("th2");
let th3 = document.getElementById("th3");

let buttonPrint = document.getElementById("buttonPrint");
let buttonClear = document.getElementById("buttonClear");
let inputText = document.getElementById("inputText");
let printText = document.getElementById("printText");


div.style.backgroundColor = (`rgb(${th1.value}, ${th2.value}, ${th3.value})`);

function changeInput(e) {
    let target = e.target;
    if (tr1.contains(target)) {
        for (let i = 0; i < tr1.childElementCount; i++) {
            tr2.children[i].firstElementChild.value = tr1.children[i].firstElementChild.value;
        }
    }
    else if (tr2.contains(target)) {
        for (let i = 0; i < tr1.childElementCount; i++) {
            tr1.children[i].firstElementChild.value = tr2.children[i].firstElementChild.value;
        }
    }
    div.style.backgroundColor = (`rgb(${th1.value}, ${th2.value}, ${th3.value})`);
}
function printColorText(e){
    let p = document.createElement("p");
    if(inputText.value !== null)
        p.textContent = inputText.value;
    p.style.color = div.style.backgroundColor;
    printText.appendChild(p);
}
function clear(){
    let length = printText.children.length;
    if(printText.children.length !== 0){
        for(let i = length - 1; i >= 0; i--)
            printText.children[i].remove();
        }
    inputText.value = "";
}

table.addEventListener("change", changeInput);
buttonPrint.addEventListener("click", printColorText);
buttonClear.addEventListener("click", clear);