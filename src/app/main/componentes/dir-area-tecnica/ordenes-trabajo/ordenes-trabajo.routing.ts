import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {OrdenesTrabajoAdminComponent} from './ordenes-trabajo-admin/ordenes-trabajo-admin.component';

const ordenesTrabajoRouting: Routes =
    [
        {
            path: '',
            component: OrdenesTrabajoAdminComponent
        }
    ];

@NgModule({
    imports:
        [
            RouterModule.forChild(ordenesTrabajoRouting)
        ]
})
export class OrdenesTrabajoRouting
{

}
