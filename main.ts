import { Observable, Observer, from } from 'rxjs'

let colors = ["violet", "indigo", "blue", null, undefined];

// let source = from(colors);

let source = Observable.create((observer) => {

    let index = 0;
    let produceColor = () => {
        let color = colors.length > index && colors[index];
        if (!!color) {
            observer.next(color);
            setTimeout(produceColor, 1000);
            index++;
        } else {
            observer.complete();
        }
    }
    produceColor();
})

class ColorObserver implements Observer<string> {

    constructor(private name) {

    }
    next(value) {
        console.log(`ColorObserver ${this.name}: ${value}`);
    }

    error(error) {
        console.error(error);
    }

    complete() {
        console.log(`ColorObserver ${this.name}: Complete`);
    }
}

source.subscribe(new ColorObserver(1))
source.subscribe(new ColorObserver(2))
source.subscribe(
    (value) => { console.log(`ColorObserver Anonymous: ${value}`) },
    (error) => { console.error(`ColorObserver Anonymous: ${error}`) },
    () => { console.log(`ColorObserver Anonymous Complete`) }
)