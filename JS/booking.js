class Booking {
    constructor(canvas) {
        // récupération message de confirmation lors du rafraîchissement
        // localStorage 
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("firstName").value = localStorage.getItem("firstName");
        // sessionStorage
        document.getElementById("adress").textContent = sessionStorage.getItem("station");
        // message de confirmation
        if (sessionStorage.getItem("station")) {
        document.getElementById("message-confirm-renting").textContent = " Vélo réservé à la station " + document.getElementById("adress").textContent + " pour " + document.getElementById("name").value + " " + document.getElementById("firstName").value;
        // affichage du message de confirmation
        document.getElementById("confirm-renting").style.display = "block";
        // Faire disparaître les informatons stations
        document.getElementById("block-infos-right").style.display = "none";
        // Agrandir map
        document.getElementById("map").style.width = "100%";
        }
        // récupération compte à rebours minutes et secondes lors du rafraîchissement - sessionStorage
        this.interval;
        this.minutes = 20;
        this.seconds = 0;
            if (sessionStorage.getItem("minutes")> 0 || sessionStorage.getItem("secondes")> 0) {
                this.minutes = sessionStorage.getItem("minutes"); 
                this.seconds = sessionStorage.getItem("secondes"); 
                this.countdown();
            }
        // appel fonctions 
        this.displaySign ();
        this.displayConfirmRenting ();
        this.cancelBooking ();
        this.canvas = canvas; // appel de la classe - validation signature
    }

    displaySign () {
        // évènement réservation afficher signature 
        let booking = document.getElementById("booking");
        let signature = document.getElementById("signature");
        booking.addEventListener("click", () => {
            if (getComputedStyle(signature).display != "none") {
                signature.style.display = "none"; }
            else {
                signature.style.display = "inline-block";
            }
            // localStorage - stockage
            this.input = document.getElementById("name").value;
            localStorage.setItem("name", this.input);    
            // localStorage - stockage 
            this.input = document.getElementById("firstName").value;
            localStorage.setItem("firstName", this.input);
        })
    } 

    displayConfirmRenting () {
        // évènement signature afficher confirmation location
        let confirm = document.getElementById("confirm");
        let confirmRenting = document.getElementById("confirm-renting");
        confirm.addEventListener ("click", () => {
            if (this.canvas.signatureValide) { // appel élément canvas validation signature
                if (getComputedStyle(confirmRenting).display != "none") {
                    confirmRenting.style.display = "none"; }
                else {
                    confirmRenting.style.display = "block";
                    // faire disparaître signature
                    signature.style.display = "none";
                    // faire disparaître les informatons stations
                    document.getElementById("block-infos-right").style.display = "none";
                    // agrandir map
                    document.getElementById("map").style.width = "100%";
                    // lancement compte à rebours
                    this.countdown(); 
                }
                // affichage du message de confirmation
                document.getElementById("message-confirm-renting").textContent = " Vélo réservé à la station " + document.getElementById("adress").textContent + " pour " + document.getElementById("name").value + " " + document.getElementById("firstName").value;
                // sessionStorage - stockage station
                sessionStorage.setItem("station", document.getElementById("adress").textContent);
                // localStorage - stockage nom
                this.input = document.getElementById("name").value;
                localStorage.setItem("name", this.input); 
                // localStorage - stockage prenom
                this.input = document.getElementById("firstName").value;
                localStorage.setItem("firstName", this.input);
            }   
        });
    }
            
    cancelBooking () {   
        // évènement annulation reservation
        document.getElementById("cancel").addEventListener ("click", () => {
        document.getElementById("message-confirm-renting").textContent = "Votre réservation est annulée.";
        document.getElementById("cancel").style.display = "none";
        document.getElementById("countdown-text").style.display = "none"; 
        clearInterval(this.interval); // Arrêter le compte à rebours 
        sessionStorage.clear(); // annulation session Storage
        });
    }
  
    countdown() {
        // évènement compte à rebours
        this.interval = setInterval(()=> {
        document.getElementById("countdown");
        // quand le compte à rebours est écoulé
        if(this.seconds == 0) {
            if(this.minutes == 0) {
            countdown.innerHTML = "Votre réservation à expirée.";                   
            clearInterval(this.interval); // Arrêter le compte à rebours 
            return; } 
        else {
            // le compte à rebours recommence
            this.minutes--;
            this.seconds = 59;
            }
        }
        if(this.minutes > 0) {
            this.minute_text = this.minutes + " " + (this.minutes > 1 ? "minutes" : "minute"); } 
        else {
            this.minute_text = '';
        }
        this.second_text = this.seconds > 1 ? "secondes" : "seconde"; 
        countdown.innerHTML = this.minute_text + " " + this.seconds + " " + this.second_text;
        this.seconds--;
        sessionStorage.setItem("minutes", this.minutes); // sessionStorage - stockage des minutes
        sessionStorage.setItem("secondes", this.seconds); // sessionStorage - stockage des secondes
        }, 1000);
    }
}
