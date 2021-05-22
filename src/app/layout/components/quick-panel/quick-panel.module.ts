import {NgModule} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {FuseSharedModule} from '@fuse/shared.module';
import {QuickPanelComponent} from './quick-panel.component';
import {ComponenteDinamicoDirective} from '../../../main/directives/componente-dinamico.directive';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';
import {ArchivoUrlModule} from '../../../main/pipes/archivo-url.module';

@NgModule({
    declarations: [
        QuickPanelComponent,
        ComponenteDinamicoDirective
    ],
    imports: [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        FuseSharedModule,
        ToolbarModule,
        MaterialModule,
        NgxBootstrapModule,
        PrimeNgModule,
        ArchivoUrlModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
