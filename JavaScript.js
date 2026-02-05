// https://www.incrementaldb.com/game/algebraic-progression?utm_source=chatgpt.com
let points = 0;
let number = 1;
let number2 = 1;
let number3 = 1;
let number4 = 1;
let number5 = 1;
let number6 = 1;
let idle = 0;
let Autoclickers = 0;
let AutoclickMulti = 1;
let ClickPower = 0;
let ClickMultiplier = 0;
let ClickCompound = 0;
let upgradeCost = 25;
let autoCost = 100;
let upgradeCost2 = 50;
let upgradeCost3 = 1000;
let upgradeCost4 = 3;
let PrestigeReq = 1e6;
let PrestigeAmount = 0
let Prestige = 0;

document.getElementById("points").innerText = Number(points).toLocaleString("en-US");
document.getElementById("cost3").innerText = Number(upgradeCost3).toLocaleString("en-US");
document.getElementById("auto-cost").innerText = Number(autoCost).toLocaleString("en-US");

function PrestigePreview(){
    const ppAmount = document.getElementById("amount")
    PrestigeAmount = Math.floor(Math.log10(points/1e5));
    if(PrestigeAmount >= 1){   
    ppAmount.innerText = `+ ${PrestigeAmount} prestige points`;
    } else {
    ppAmount.innerText = `${PrestigeReq.toLocaleString("en-US")} points`;
    }
}

function pointClick(){
    number = number2 * number3 * number4 * number5 * number6;
    points = points + number;
    document.getElementById("points").innerText = Number(points.toFixed()).toLocaleString("en-US");   
    PrestigePreview()
};

function Prestige0(){
    points = ClickPower = ClickMultiplier = ClickCompound = Autoclickers = 0;
    upgradeCost = 25;
    upgradeCost2 = 50;
    autoCost = 100;
    upgradeCost3 = 1000;
    number2 = number3 = number4 = 1;
    document.getElementById("amount").innerText = `${PrestigeReq.toLocaleString("en-US")} points`;
}

function updateTexts() {
    document.getElementById("points").innerText = Number(points.toFixed()).toLocaleString("en-US");
    document.getElementById("upgrade").innerText = ClickPower
    document.getElementById("upgrade2").innerText = ClickMultiplier
    document.getElementById("upgrade3").innerText = ClickCompound
    document.getElementById("autoclickers").innerText = Autoclickers
    document.getElementById("idle").innerText = Number(Math.ceil(idle)).toLocaleString("en-US")
    document.getElementById("auto-cost").innerText = Number(autoCost.toFixed()).toLocaleString("en-US");
    document.getElementById("cost").innerText = Number(upgradeCost.toFixed()).toLocaleString("en-US");
    document.getElementById("cost2").innerText = Number(upgradeCost2.toFixed()).toLocaleString("en-US");
    document.getElementById("cost3").innerText = Number(upgradeCost3).toLocaleString("en-US");
    document.getElementById("cost4").innerText = Number(upgradeCost4).toLocaleString("eb-US");
    document.getElementById("prestige").innerText = Number(Prestige).toLocaleString("en-US");
    document.getElementById("effect").innerText = Number(ClickPower).toLocaleString("en-US");
    document.getElementById("effect2").innerText = Number(number3).toLocaleString("en-US");
    document.getElementById("effect3").innerText = Number(number4).toLocaleString("en-US");
    document.getElementById("effect4").innerText = Number(number5.toFixed(2)).toLocaleString("en-US");
}

function upgradeClick() {
    if (points >= upgradeCost) {
    points = points - upgradeCost;
    ClickPower = ClickPower + 1;
    number2 = ClickPower + 1;
    upgradeCost = Math.floor(25* (1.25**ClickPower))
    if (ClickPower >= 25) {
    upgradeCost = Math.floor(25 * (1.25 ** 25) * (1.5 ** (ClickPower - 25)));
    }
    updateTexts();
    }
}

function Autoclick(){
    if(points >= autoCost){
        points -= autoCost
        Autoclickers++
        autoCost *= 3
        updateTexts()
    }
}

function Idle(){
    number = number2 * number3 * number4 * number5 * number6;
    idle = (number/5) * Autoclickers * AutoclickMulti
    points += idle
    document.getElementById("idle").innerText = Number(Math.ceil(idle)).toLocaleString("en-US")
    document.getElementById("points").innerText = Number(points.toFixed()).toLocaleString("en-US");
}
setInterval(Idle, 1000)

function upgradeClick2() {
    if (points >= upgradeCost2) {
    points = points - upgradeCost2;
    ClickMultiplier = ClickMultiplier + 1;
    number3 = ClickMultiplier*1 + 1;
    upgradeCost2 = Math.floor(50* (1.3**ClickMultiplier))
    if (ClickMultiplier >= 25) {
        upgradeCost2 = Math.floor(50* (1.3** 25)) * (1.5 ** (ClickMultiplier - 25));
    }
    updateTexts();
    }
}

function upgradeClick3() {
    if (points >= upgradeCost3) {
    points = points - upgradeCost3;
    ClickCompound = ClickCompound + 1;
    number4 = 2**ClickCompound;
    upgradeCost3 = Math.floor(1e3 * (3**ClickCompound))
    if (ClickCompound >= 10){
        upgradeCost3 = Math.floor(1e3 * (3 ** 10)) * (5 ** (ClickCompound - 10));
    }
    updateTexts();
    }
}

function ResetLayer() {
    if(points >= PrestigeReq) {
        PrestigeAmount = Math.floor(Math.log10(points/1e5));  
        Prestige += PrestigeAmount
        number5 = 1.15**Prestige;
        Prestige0();
        updateTexts();
    }    
}

const ppUpgrade = document.getElementById("prestigeUpg")

ppUpgrade.onclick = function PrestigeUpg(){
    if(Prestige >= 1){
        Prestige -= 1
        number5 = 1.15**Prestige
        number6 *= 3
        document.getElementById("prestigeCost").innerText = "Bought!"
        updateTexts()
        ppUpgrade.onclick = null
    }
}

const unlockBuyable = document.getElementById("unlockBuyable")
const prestigeBuyable = document.getElementById("prestigeBuyable")
const buyables = document.getElementById("buyables")
unlockBuyable.addEventListener("click", buyable)

function buyable(){
    if(Prestige >= 3){
        Prestige -= 3
        number5 = 1.15**Prestige
        document.getElementById("prestigeCost2").innerText = "Bought!"
        updateTexts()
        prestigeBuyable.style.display = "block"
        buyables.style.display = "block"
        unlockBuyable.removeEventListener("click", buyable)
    }
}

const Autoclickspeed = document.getElementById("autoclickmulti")
Autoclickspeed.addEventListener("click", autoclickmulti)

function autoclickmulti(){
    if(Prestige >= 5){
        Prestige -= 5
        document.getElementById("prestigeCost3").innerText = "Bought!"
        AutoclickMulti = 2
        number5 = 1.15**Prestige
        updateTexts()
        Autoclickspeed.removeEventListener("click", autoclickmulti)

    }
}

function upgradeClick4(){
    if(Prestige >= upgradeCost4){
        Prestige -= upgradeCost4
        number5 = 1.15**Prestige
        number6 *= 1.5
        upgradeCost4 = Math.ceil(upgradeCost4 * 1.5)
        updateTexts()
    }
}