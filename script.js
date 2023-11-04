
<script>
        const quoteText = document.querySelector(".quote");
        const quoteBtn = document.querySelector("button");
        const authorName = document.querySelector(".name");
        const speechBtn = document.querySelector(".speech");
        const copyBtn = document.querySelector(".copy");
        synth = speechSynthesis;
        
        function randomQuote(){
            quoteBtn.classList.add("loading");
            quoteBtn.innerText = "Loading Quote...";
            fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
                quoteText.innerText = result.content;
                authorName.innerText = result.author;
                quoteBtn.classList.remove("loading");
                quoteBtn.innerText = "New Quote";
            });
        }
        
        speechBtn.addEventListener("click", () =>{
            if(!quoteBtn.classList.contains("loading")){
                let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
                synth.speak(utterance); // initiates the speech synthesis causing the browser to speak the combined text
                setInterval(()=>{  // sets up a recurring timer(every 10 miliseconds)
                    !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
                }, 10);
            }
        });
        copyBtn.addEventListener("click", ()=>{
            navigator.clipboard.writeText(quoteText.innerText); // method used to copy text to the clipboard
        });
        
        quoteBtn.addEventListener("click", randomQuote);
    </script>
