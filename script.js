let div = document.getElementById("selectedColor");
let table = document.getElementById("table");

let tr1 = document.getElementById("tr1");
let tr2 = document.getElementById("tr2");
let th1 = document.getElementById("th1");
let th2 = document.getElementById("th2");
let th3 = document.getElementById("th3");

let buttonPrint = document.getElementById("buttonPrint");
let buttonClear = document.getElementById("buttonClear");
let buttonRefill = document.getElementById("buttonRefill");
let inputText = document.getElementById("inputText");
let printText = document.getElementById("printText");
let inkPercent = document.getElementById("inkPercent");

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

function printColorText() {
    let curentColor = (`rgb(${th1.value}, ${th2.value}, ${th3.value})`);
    // myMarker.setColor(curentColor);
    // myMarker.print(inputText.value);
    // inkPercent.value = myMarker.getInkPercent();
    myRefillableMarker.setColor(curentColor);
    myRefillableMarker.print(inputText.value);
    inkPercent.value = myRefillableMarker.getInkPercent();
}

function clear() {
    let length = printText.children.length;
    if (printText.children.length !== 0) {
        for (let i = length - 1; i >= 0; i--)
            printText.children[i].remove();
    }
    inputText.value = "";
}

//
function marker(color, ink) {
    this._color = color;
    this._ink = ink > 0 && ink < 101 ? ink : 100;
    this._canPrint = true;
}

marker.prototype.print = function (text) {
    this.inInk(text.length);
    if (!this._canPrint)
        return;
    let p = document.createElement("p");
    if (text !== null)
        p.textContent = text;
    p.style.color = this._color;
    printText.appendChild(p);
};

marker.prototype.getInkPercent = function () {
    return this._ink;
}

marker.prototype.setColor = function (color) {
    this._color = color;
}

marker.prototype.inInk = function (numberOfchar) {
    if (this._ink === 0) {
        this._ink = 0;
        this._canPrint = false;
    }
    else {
        this._ink -= (numberOfchar * 0.5);
        if (this._ink < 0) this._ink = 0;
    }
}

function refillableMarker(color, ink) {
    marker.call(this, color, ink);
}
refillableMarker.prototype.__proto__ = marker.prototype;

refillableMarker.prototype.inkRefill = function () {
    this._ink = 100;
    this._canPrint = true;
    inkPercent.value = myRefillableMarker.getInkPercent();
}

let myMarker = new marker(div.style.backgroundColor, 75);
// ink refill
let myRefillableMarker = new refillableMarker(div.style.backgroundColor, 75);

function refill(){
    myRefillableMarker.inkRefill();
}

table.addEventListener("change", changeInput);
buttonPrint.addEventListener("click", printColorText);
buttonClear.addEventListener("click", clear);
buttonRefill.addEventListener("click", refill);