import { Observable, Observer, Operator, Subject, ReplaySubject, from, of, range, pipe } from 'rxjs';
import { map, filter, switchMap,  } from 'rxjs/operators';

let colors = ["violet", "indigo", "blue", "black", null, undefined];

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
}).pipe(filter(color => !!color && color != "black"), map(color => `Bright ${color}`));

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

export default {
    execute: () => {
        source.subscribe(new ColorObserver(1))
        source.subscribe(new ColorObserver(2))
        source.subscribe(
            (value) => { console.log(`ColorObserver Anonymous: ${value}`) },
            (error) => { console.error(`ColorObserver Anonymous: ${error}`) },
            () => { console.log(`ColorObserver Anonymous Complete`) }
        )
    }
}

