import {Observable, Observer, from} from 'rxjs'

let colors = ["violet", "indigo", "blue", null, undefined];

let source = from(colors);

class ColorObserver implements Observer<string> {

    constructor(private name) {

    }
    next (value) {
        console.log(`ColorObserver ${this.name}: ${value}`);
    }

    error (error) {
        console.log(error);
    }

    complete () {
        console.log("Complete");
    }
}

source.subscribe(new ColorObserver(1))
source.subscribe(new ColorObserver(2))