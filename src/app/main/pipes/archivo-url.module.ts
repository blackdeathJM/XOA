import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchivoUrlPipe} from './archivo-url.pipe';

@NgModule({
    declarations: [ArchivoUrlPipe],
    exports: [ArchivoUrlPipe],
    imports: [
        CommonModule
    ]
})
export class ArchivoUrlModule
{
}
