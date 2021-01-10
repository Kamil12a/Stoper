const buttonStart=document.querySelector("#Start")
const buttonPause=document.querySelector("#Pause")
const buttonStop=document.querySelector("#Stop")
const buttonReset=document.querySelector("#Reset")
const buttonSave=document.querySelector("#Save")
const buttonNext=document.querySelector("#Next")
const time=document.querySelector("#time")
let Scores=[]
let StoperStart
let hundrethSecound=0
let tenthsSecound=0
let secound=0
let tenSecound=0
let minut=0
let tenthsminut=0
let IsStopped=false
buttonStop.style.display="none"
let Start=false
let StoperPlay=false
const cat = localStorage.getItem('');
time.innerText=`${tenthsminut}${minut}:${tenSecound}${secound}.${tenthsSecound}${hundrethSecound}`
buttonSave.style.display="none"
buttonStart.addEventListener('click',e=>{
    
    if(IsStopped===false){

        if(StoperPlay===false){
            Stoper()
            buttonPause.innerText="Pause"
            StoperPlay=true
            buttonStop.style.display="inline-block"
            Start=true
        }
    }
})
buttonPause.addEventListener('click',e=>{

    if(IsStopped===false&&Start===true){
        if(StoperPlay===true){
            clearInterval(StoperStart)
            StoperPlay=false
            buttonPause.innerText="UnPause"
        }
        else{
            Stoper()
            StoperPlay=true
            buttonPause.innerText="Pause"
        }
    }
    
})
buttonStop.addEventListener('click',e=>{
    hundrethSecound=0
    tenthsSecound=0
    secound=0
    tenSecound=0
    minut=0
    tenthsminut=0
    Scores.push(time.innerText)
    StoperPlay=false
    IsStopped=true
    StoperPlay=false
    clearInterval(StoperStart)
    buttonSave.style.display="inline-block"
    
})

buttonReset.addEventListener('click',e=>{
    if(IsStopped){
        buttonStop.style.display="none"
        buttonSave.style.display="none"
        
        IsStopped=false
        Start=false
        Times.innerHTML=""
        time.innerText=`${tenthsminut}${minut}:${tenSecound}${secound}.${tenthsSecound}${hundrethSecound}`
    }
    
   
})
buttonSave.addEventListener('click',e=>{
    if(IsStopped===true){
        let promiss= prompt("Podaj wpis");
        let a=promiss
      if(promiss!=null){
          IsStopped=false
          Start=false
          buttonStop.style.display="none"
          buttonSave.style.display="none"
          localStorage.setItem(a,Scores)
          for(i=0;i<localStorage.length;i++){
            addToFirebase(i)
          }            
          htmlChanger=htmlConstant
          addScores()
          Scores=[]
          Times.innerHTML=""
          time.innerText=`${tenthsminut}${minut}:${tenSecound}${secound}.${tenthsSecound}${hundrethSecound}`

      }
      else{
          
      }
      

    }
})
const Times=document.querySelector("#Times")
buttonNext.addEventListener("click",e=>{
    
    if(StoperPlay===true){
        Scores.push(time.innerText)
        Times.innerHTML=`
        <h2 id="time" class="text-xl mt-8 font-bold font-sans text-indigo-600">${time.innerText}</h2>
        `+Times.innerHTML

    }
    
    
})


function Stoper(){StoperStart=setInterval(function(){
    if(tenthsSecound===9&&hundrethSecound===9&&secound===9&&tenSecound===9&&minut===9){
        minut=0
        tenSecound=0
        secound=0
        tenthsSecound=0
        hundrethSecound=0
        tenthsminut++
    }
    if(tenthsSecound===9&&hundrethSecound===9&&secound===9&&tenSecound===5){
        tenSecound=0
        secound=0
        tenthsSecound=0
        hundrethSecound=0
        minut++
    }
    if(tenthsSecound===9&&hundrethSecound===9&&secound===9){
        tenSecound++
        secound=0
        tenthsSecound=0
        hundrethSecound=0
    }
    if(tenthsSecound===9&&hundrethSecound===9){
        secound++
        tenthsSecound=0
        hundrethSecound=0
    }
    if(hundrethSecound===9){
        hundrethSecound=0
        tenthsSecound++
    }
    
    hundrethSecound++
    time.innerText=`${tenthsminut}${minut}:${tenSecound}${secound}.${tenthsSecound}${hundrethSecound}`

},10)}




htmlConstant=document.getElementById("Scores").innerHTML
htmlChanger=document.getElementById("Scores").innerHTML
document.getElementById("Scores").style.display="block"
document.getElementById("Scores").style.textAlign="center"
function addScores(){


    for(i=0;i<localStorage.length;i++){
        document.getElementById("Scores").innerHTML=
        htmlChanger= htmlChanger+
        `<p id=" ${i}" class="text-xl font-bold font-sans text-indigo-600"">wpis: ${Object.keys(localStorage)[i]}</p>`
        
}

}
addScores()
document.getElementById("Scores").addEventListener("click",e=>{
    number=parseInt(e.target.id)
    str=e.target.id.toString().slice(2,3)
    
    
    if(localStorage.getItem(Object.keys(localStorage)[number])!=null&&str!="D"){
    
    e.target.innerText=`${e.target.innerText} \n  czasy: ${localStorage.getItem(Object.keys(localStorage)[number])}`}
    
    e.target.id=e.target.id+"D"
    if(localStorage.getItem(Object.keys(localStorage)[number])!=null&&str==="D"){
    
        e.target.id=" "+e.target.id.toString().slice(1,2)
        e.target.innerText=`wpis: ${Object.keys(localStorage)[parseInt(e.target.id)]}`
    }
})



function addToFirebase(i){
    key=Object.keys(localStorage)[i]
    index=localStorage.getItem(Object.keys(localStorage)[i]).toString()


    firebase.firestore().collection("Czasy").doc(Object.keys(localStorage)[i].toString()).set({
        key:index
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });


}


