//constructor function for this (every function is connected to other .js files)
function Visualisations() {
    //array to store visualisations
    this.visuals = [];

    //current selected vis set to "null" until vis is loaded in
    this.selectedVisual;

    //add new visualisation to array
    this.add = function (vis) {
        this.visuals.push(vis);
        //if selectedVisual is "null", then set the new vis as the current vis
        if (this.selectedVisual == null) {
            this.selectVisual(vis.name);
        }
    };

    //select visualisation using its name property
    this.selectVisual = function (visName) {
        //if selected another vis, then current (aka. old) vis will do ".unSelectVisual" function
        if (this.selectedVisual != null) {
            if (this.selectedVisual.hasOwnProperty("unSelectVisual")) {
                this.selectedVisual.unSelectVisual();
            }
        }
        //for all vis, if selected a vis, then that vis will do ".selectVisual" function
        for (var i = 0; i < this.visuals.length; i++) {
            if (visName == this.visuals[i].name) {
                this.selectedVisual = this.visuals[i];
                if (this.selectedVisual.hasOwnProperty("selectVisual")) {
                    this.selectedVisual.selectVisual();
                }
            }
        }
    };
}
