import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DocumentosAdmonComponent} from './documentos-admon.component';
import {AdministracionDocComponent} from './componentes/administracion-doc/administracion-doc.component';
import {AdminGuard} from '@funcionesRaiz/admin.guard';

const documentosRouting: Routes =
    [
        {
            path: '',
            component: DocumentosAdmonComponent,
            canActivate: [AdminGuard],
            children:
                [
                    {
                        path: 'admon-docs',
                        component: AdministracionDocComponent
                    }
                ]
        }
    ];

@NgModule({imports: [RouterModule.forChild(documentosRouting)]})
export class DocumentosRouting {
}
