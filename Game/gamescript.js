
let seconds=60;
let timerId;
let modal=document.getElementById("myModal");
export let finalScore=document.getElementById("userfinalscore");


//timer function to stop game after 1 minute
export let startTimer = function(stopid) {
  if(!timerId) {
    timerId = window.setInterval(function() {
        if(seconds < 60 ) { 
          document.getElementsByClassName("timer")[0].innerHTML = `00:${seconds}`;
        }
        if (seconds >0 ) { 
           seconds--;
        } else {
           clearInterval(timerId);
           clearInterval(stopid);
           modal.style.display = "block";
           document.getElementsByTagName("audio")[0].pause();
        }
      }, 1000);
  }
}

//function to get user name entered in the main page textbox
export let getPlayerName=function(){
    let userName=location.search.substring(1).split("=")[1].replace('%20',' ');
    let userNameSpan=document.getElementsByClassName("userdetails")[0];
    userNameSpan.innerHTML=userName;
    return userName;
}

//function to send to server the user name that played the game
export let saveData=function(playername){
      let data={name:playername};
      try{
        fetch('https://node-monge-iti-project.herokuapp.com/games',{
          method:'POST',
          headers:{'Content-Type':'application/json',},
          body: JSON.stringify(data),
        });
      }
      catch(error)
      {
        console.log("error in saving data")
      }
}

 //function to get ther last time user played the game from the game server to display it 
export let getUserDate=async function(playername){
    try{
      fetch(`https://node-monge-iti-project.herokuapp.com/games/${playername}`)
      .then((response)=>response.json())
      .then((data)=>{
        let userDateSpan=document.getElementsByClassName("userdetails")[1];
        if(data.date){
          let dateFormat=new Date(data.date).toLocaleString('en-US');
          userDateSpan.innerText=dateFormat;
        }
        else{
          userDateSpan.innerText="This is your first game.";
        }
      }).catch(()=>{
        return 0;
      });
    }catch(error){
      console.log("error in getting data");
    }
}

//set the timer at beginnings with one minute
window.document.getElementsByClassName("timer")[0].innerHTML="1:00"; 

//events on the popo up that appear after the game is finished 
let playAgainButton=document.getElementsByClassName("playagain")[0];
playAgainButton.onclick= function() {
  modal.style.display = "none";
  window.location.reload();
}

let mainPageButton=document.getElementsByClassName("exit")[0];
mainPageButton.onclick=function(){
    window.open("mainpage.html","_self");

}

let closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
  modal.style.display = "none";
  window.location.reload();
}






