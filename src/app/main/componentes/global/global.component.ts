import {Component, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-global',
    templateUrl: './global.component.html',
    styleUrls: ['./global.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class GlobalComponent
{

}
