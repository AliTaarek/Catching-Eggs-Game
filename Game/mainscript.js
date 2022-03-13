let userName=document.querySelector("input[type=text]");
let rulesButton=document.getElementsByTagName("button")[1]
let startButton=document.getElementsByTagName("button")[0]
let easyMode=document.getElementById("easy");
let hardMode=document.getElementById("hard");

window.onload=function(){
    document.getElementsByTagName("audio")[0].play();
    userName.focus();
}
window.document.onclick=function(){
    document.getElementsByTagName("audio")[0].play();
}
//view rules of the game
rulesButton.addEventListener("click",function(){
    alert(` The Game Rules:
    Try to catch falling eggs.
    move the basket using keyboard arrows or mouse.
    You have only one minute.
    Let's go`
      );
    });

//validation on user name box
userName.addEventListener("keyup",function(){
          let name=userName.value.split('');
          for(let item in name){
              if(Number(name[item])){
                this.value='';
                alert("please enter characters only");
              }
          }
      })
      
// redirection to the game page with the chosen mode
startButton.addEventListener("click",function(){
    if(!userName.value){
        alert("please enter your name");
    }
    else if(easyMode.checked){
        window.open("easygamepage.html?name="+userName.value,"_self");
    }   
    else if(hardMode.checked){
        window.open("hardgamepage.html?name="+userName.value,"_self");
    }
})

