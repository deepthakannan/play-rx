import { Observable, Observer, Operator, Subject, ReplaySubject, from, of, range, pipe, fromEvent } from 'rxjs';
import { map, filter, switchMap  } from 'rxjs/operators';

let circle = document.getElementById("circle");

let source = fromEvent(document, "mousemove").pipe(map(function(value: MouseEvent) {
    return {
        x: value.clientX,
        y: value.clientY
    }
}));

export default {
    execute: () => {
        source.subscribe({
            next: (value) => {
                circle.style.left = value.x.toString();
                circle.style.top = value.y.toString()
            },
            error: (value) => console.error(value),
            complete: () => console.info("Complete")
        })
    }
}