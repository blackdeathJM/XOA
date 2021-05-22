import {NgModule} from '@angular/core';


import {HorizontalLayout1Module} from 'app/layout/horizontal/layout-1/layout-1.module';
import {VerticalLayout1Module} from './vertical/layout-1/layout-1.module';

@NgModule({
    imports: [
        VerticalLayout1Module,

        HorizontalLayout1Module
    ],
    exports: [
        VerticalLayout1Module,

        HorizontalLayout1Module
    ]
})
export class LayoutModule {
}
