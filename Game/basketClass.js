export class Basket{
    #Top;
    #Left;
    body;
    constructor(top=window.innerHeight-150,left=window.innerWidth/2){
        this.#Top=top;
        this.#Left=left;
        this.body={};
    };
    get top(){return this.#Top };
    set top(value){this.#Top=value};
    get left(){return this.#Left };
    set left(value){this.#Left=value};

    moveLeft(){
        this.left -= 10;
        this.body.style.left=`${this.left}px`
    }
    moveRight(){
        this.left += 10;
        this.body.style.left=`${this.left}px`
    }
    
    //method to add the basket object to the html page
    addToPage(){
        this.body=document.createElement("div");
        this.body.style=`position:absolute;width:100px;height:100px;
        top:${this.top}px;left:${this.left}px;`
        let basketImg=document.createElement("img")
        basketImg.style.width="130px";
        basketImg.style.height="147px";
        basketImg.src="./images/basket.png"
        this.body.appendChild(basketImg);
        window.document.body.append(this.body);
    }
}

//create and add basket to the html page
export let basket=new Basket();
basket.addToPage();

//event for moving basket with keyboard arrows
document.addEventListener("keydown",function(event){ 
    if (event.keyCode == '37') {
        basket.moveLeft();
        if(basket.left<=0){
            basket.left=window.innerWidth-130;
        }
    }
     else if (event.keyCode == '39') {
        basket.moveRight();
        if(basket.left>=window.innerWidth-130){
            basket.left=0;
        }
    }

})

//event for moving basket with mouse
document.addEventListener("mousemove",function(event){
        
   basket.left=event.clientX;
   basket.body.style.left=`${event.clientX}px`;
   if(basket.left>=window.innerWidth-130){
    basket.left=window.innerWidth-130;
    basket.body.style.left=`${basket.left}px`;
    }
})