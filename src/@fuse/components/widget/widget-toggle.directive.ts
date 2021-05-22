import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[fuseWidgetToggle]'
})
export class FuseWidgetToggleDirective {
    /**
     * Constructor
     *
     * @param elementRef
     */
    constructor(
        public elementRef: ElementRef
    ) {
    }
}
