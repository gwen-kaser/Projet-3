class Slider {
    constructor() {
        // tableau affichage image
        this.slide = new Array("images/slider-1.jpg", "images/slider-2.jpg", "images/slider-3.jpg", "images/slider-4.jpg", "images/slider-5.jpg", "images/slider-6.jpg");
        // tableau affichage texte
        this.slideText = new Array("Le diaporama vous guidera sur la marche à suivre pour louer votre vélo en ligne !", "1. Cliquez sur la station de votre choix et retrouvez les informations dans le cadre à droite de la map ", "2. Une fois votre station choisi retrouvez les informations puis insérez votre nom, votre prénom et cliquez sur : Réserver", "3. Valider votre signature dans le cadre ci-dessous, puis: Confirmer", "4. Votre réservation est faite ! un message de confirmation s'affichera vous aurez 20 min pour récupérer votre vélo", "5. Si vous souhaitez annuler votre réservation, cliquez sur : Annuler");
        this.numero = 0;
        // appel fonctions
        this.arrows();
        this.keydown();
        this.automaticScrolling();
    } 

    changeSlide(sens) {
        // appel changement images et textes
        this.numero = this.numero + sens;
        if (this.numero < 0)
            this.numero = this.slide.length -1;
        if (this.numero > this.slide.length -1)
            this.numero = 0;
        document.getElementById("slide").src = this.slide[this.numero];
        document.getElementById("slide-text").textContent = this.slideText[this.numero]; 
    }

    arrows() {
        // évènement click passer à l'image précédente
        let left = document.getElementById("left");
        left.addEventListener("click", () => {
            this.changeSlide (-1)
        });

        // évènement click passer à l'image suivante
        let right = document.getElementById("right");
        right.addEventListener("click", () => {
            this.changeSlide(1);
        });
    }
    
    keydown() {
        // évènements liés aux touches du clavier
        document.addEventListener("keydown",(event) => {
            if (event.keyCode == 37){ // image précédente
                this.changeSlide (-1);
            }
            if (event.keyCode == 39){ // image suivante
                this.changeSlide (1);
            }
        });
    }

    automaticScrolling() {
        // défilement automatique 5 secondes
        let intervalId = setInterval(() => { this.changeSlide(1)}, 5000);
        let isPause = true
        document.getElementById("pause").addEventListener("click", () => {
            // mettre l'image en pause
            if (isPause) {
                clearInterval(intervalId);
                isPause = false;
            }
            // relancer le défilement automatique 5 secondes
            else {
                intervalId = setInterval(() => { this.changeSlide(1)}, 5000);
                isPause = true;
            }
        });
    }
}   

