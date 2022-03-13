import * as basketModule from "./basketClass.js"
import * as gameModule from "./gamescript.js"
export let userScore=0;
export class Egg {
    #Top;
    #Left;
    body;
    constructor(top=10,left=Math.ceil(Math.random()*(window.innerWidth-50))){
        this.#Top=top;
        this.#Left=left;
        this.body={};
        this.addEggToPage();
        this.eggFall();
    };
    get top(){return this.#Top };
    set top(value){this.#Top=value};
    get left(){return this.#Left };
    set left(value){this.#Left=value};

    moveDown(){
        this.top += 10;
        this.body.style.top=`${this.top}px`
    }

    //method to add egg object to the html page
    addEggToPage(){
        this.body=document.createElement("div");
        this.body.className="newEgg";
        this.body.style=`position:absolute;width:50px;height:50px;
        top:${this.top}px;left:${this.left}px;`
        let eggImg=document.createElement("img")
        eggImg.className="img1";
        eggImg.style.width="50px";
        eggImg.style.height="50px";
        eggImg.src="./images/newegg.png"
        this.body.appendChild(eggImg);
        window.document.body.append(this.body);
    }

    //method to make the egg object to start falling down
    //this method also calculate where the egg have fallen 
    //if the egg falls in basket it increases score
    //else if the egg falls outside basket it breaks
    eggFall(){
        let timerId=setInterval(()=>{
            this.moveDown();
            if(this.top>=window.innerHeight-70){
                if(this.left+20<basketModule.basket.left || this.left>basketModule.basket.left+100)
                {
                    let brokenEgg=this.body.querySelector("img");
                    brokenEgg.src="./images/brokenegg.png";
                    document.getElementById("break").play();
                    setTimeout(()=>{
                        brokenEgg.remove();
                    },700);
                    clearInterval(timerId);
                }
                else
                {
                    userScore++;
                    document.getElementById("basket").play();
                    document.getElementById("userscore").innerText=userScore;
                    gameModule.finalScore.innerText=userScore;
                    let removeEgg=this.body;
                    removeEgg.remove();
                    clearInterval(timerId);
                }
            } 
        },20);
    }
}

//function to create eggs that start falling down
let startgame=function(){
    let timerId=setInterval(()=>{
        new Egg();
    },1000)
    return timerId;
};

//calling start game function
let stopId=startgame();

//start timer after the game window is opened
window.onload=gameModule.startTimer(stopId);

//calling functions that get user name , send it to server,return with last played time
let playerName=gameModule.getPlayerName();
gameModule.saveData(playerName);
gameModule.getUserDate(playerName);

window.onload=function(){
    document.getElementsByTagName("audio")[0].play();
  }