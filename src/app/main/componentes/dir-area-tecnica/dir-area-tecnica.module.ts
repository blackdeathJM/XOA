import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirAreaTecnicaComponent} from './dir-area-tecnica.component';
import {DirAreaTecnicaRouting} from './dir-area-tecnica.routing';


@NgModule({
    declarations:
        [
            DirAreaTecnicaComponent
        ],
    imports:
        [
            CommonModule,
            DirAreaTecnicaRouting
        ]
})
export class DirAreaTecnicaModule
{
}
