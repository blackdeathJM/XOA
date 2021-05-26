import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirComercialComponent} from './dir-comercial.component';
import {RouterModule} from '@angular/router';
import {DirComercialRouting} from './dir-comercial.routing';
import {NgxsModule} from '@ngxs/store';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';

@NgModule({
    declarations:
        [
            DirComercialComponent,
        ],
    imports:
        [
            CommonModule,
            RouterModule,
            DirComercialRouting,
            NgxsModule.forFeature([SolicitudesState])
        ]
})
export class DirComercialModule
{
}
