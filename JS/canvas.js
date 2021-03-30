class Canvas {
    constructor() {
        // déclaration des variables et ajout des auditeurs de l'événement
        this.canvas = document.getElementById("canvas");    // appel à l'élément canvas 
        this.context = this.canvas.getContext("2d");        // contexte du canvas
        this.clickX = new Array();                          // rénitialiser nouveau canvas
        this.clickY = new Array(); 
        this.clickDrag = new Array();
        this.signatureValide = false;                       // ne pas valider si il n'y a pas de signature
        // appel fonctions 
        this.controlMouse();
        this.clearSign(); 
    }   
    
    controlMouse() {
        // appel des méthodes sur ordinateur (click souris)
        this.canvas.addEventListener("mousedown", (e) => { this.mouseDown(e);}, false); 
        this.canvas.addEventListener("mousemove", (e) => { this.mouseXY(e);}, false);
        document.body.addEventListener("mouseup", (e) => { this.mouseUp(e);}, false);
        // appel des méthodes sur écrans tactiles 
        this.canvas.addEventListener("touchstart", (e) => { this.mouseDown(e);}, false);
        this.canvas.addEventListener("touchmove", (e) => { this.mouseXY(e);}, true);
        this.canvas.addEventListener("touchend", (e) => { this.mouseUp(e);}, false);
        document.body.addEventListener("touchcancel", (e) => { this.mouseUp(e);}, false);
    }

    draw() {
        // tracer une ligne pour qu'elle soit visible
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // effacer la toile 
        this.context.strokeStyle = "#000000";  // définir la couleur de la ligne
        this.context.lineJoin = "miter";       // limite de la ligne (cadre) 
        this.context.lineWidth = 2;            // largeur du tracer
       
        for (let i = 0; i < this.clickX.length; i++) {
            this.context.beginPath();                                       // créer un chemin d’accès
        if (this.clickDrag[i] && i) {
            this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]); }  // passer à
        else {
            this.context.moveTo(this.clickX[i] - 1, this.clickY[i]); }      // passer à
            this.context.lineTo(this.clickX[i], this.clickY[i]);            // désigne le point d'arrivé du tracer
            this.context.stroke();                                          // effectue le tracer
            this.context.closePath();                                       // fermer chemin (cadre)
            this.signatureValide = true;                                    // valider si il y a signature                                  
        }
    }
    
    addClick(x, y, dragging) {
        // enregistre que la souris dessine au click
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
        
    mouseDown(e) {
        // stocker cordonnées du click - succession de traits X-Y
        this.mouseX = e.pageX - this.canvas.offsetLeft; 
        this.mouseY = e.pageY - this.canvas.offsetTop;  
        this.paint = true;
        this.addClick(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
        this.draw();
    }
        
    mouseUp() {
        // l'arrêt du dessin 
        this.paint = false;
    }
        
    mouseXY(e) {
        // vérification au click de la souris que le dessin est tracé 
        if (this.paint) {
            this.addClick(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, true);
            this.draw();
        }
    }
    
    clearSign() {
        // appel de la méthode d'effacement du canvas lors du click sur le bouton "Effacer"
        document.getElementById("clear").addEventListener ("click", () => {
            // nouveau canvas
            this.clickX = new Array();
            this.clickY = new Array();
            this.clickDrag = new Array();
            // réinitialise le canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // ne pas valider si il n'y a pas de signature
            this.signatureValide = false;
        });
    }
}

