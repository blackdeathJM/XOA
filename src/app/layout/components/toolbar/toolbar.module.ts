import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSearchBarModule, FuseShortcutsModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';

import {MaterialModule} from '@ui-externos/material/material.module';
import {ToolbarComponent} from './toolbar.component';
import {ArchivoUrlModule} from '../../../main/pipes/archivo-url.module';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        RouterModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MaterialModule,
        ArchivoUrlModule
    ],
    exports: [
        ToolbarComponent,
    ]
})
export class ToolbarModule
{
}
