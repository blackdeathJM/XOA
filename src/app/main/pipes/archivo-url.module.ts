import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchivoUrlPipe} from './archivo-url.pipe';
import { BloquearCtrlsRolesPipe } from './bloquear-ctrls-roles.pipe';

@NgModule({
    declarations: [ArchivoUrlPipe, BloquearCtrlsRolesPipe],
    exports: [ArchivoUrlPipe],
    imports: [
        CommonModule
    ]
})
export class ArchivoUrlModule
{
}
