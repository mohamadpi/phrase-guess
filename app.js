var result = document.getElementById("result");
var guess = document.getElementById("guess");
var mistake = document.getElementById("curr");
var reset = document.getElementById("reset");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var response = JSON.parse(xhttp.responseText)  ;
       var wordlist = response.phrases[0].split(" ");
       var phrase = wordlist[Math.floor(Math.random() * 3000)]
       console.log(phrase)
       
       result.innerHTML = "*".repeat(phrase.length);
       
       reset.addEventListener("click", function(){
           phrase = wordlist[Math.floor(Math.random() * 3000)];
           result.innerHTML = "*".repeat(phrase.length);
           console.log(phrase)
           guess.disabled = false;
           guess.value = "";
           mistake.innerHTML = 10
       })

       String.prototype.replaceAt = function(index, replacement) {
           return this.substr(0, index) + replacement + this.substr(index + replacement.length);
       }
       
       guess.addEventListener("keydown", e =>{
           if (phrase.indexOf(e.key) == -1){
               mistake.innerHTML = mistake.innerHTML - 1 
               if (mistake.innerHTML == 0){
                   guess.disabled = true
               }
           }
       
           for (i = 0; i < phrase.length; i++) {
               if (phrase[i] == e.key) {
                   console.log(i);
                   result.innerHTML = result.innerHTML.replaceAt(i, e.key);
               }
           }
       })
    }
};
xhttp.open("GET", "phraseList.json", true);
xhttp.send();


