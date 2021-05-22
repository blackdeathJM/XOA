import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {ContentComponent} from './content.component';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule,
        FuseSharedModule,
        MaterialModule,
        NgxBootstrapModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule {
}
