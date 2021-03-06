import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// fuse
import {FuseProgressBarModule, FuseSidebarModule} from '../@fuse/components';
import {FuseSharedModule} from '../@fuse/shared.module';
// componentes
import {AppComponent} from './app.component';
import {HomeComponent} from './main/home/home.component';
// modulos
import {AppRouting} from './app.routing';
import {LayoutModule} from './layout/layout.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {SharedModule} from '@shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
        FuseProgressBarModule,
        FuseSidebarModule,
        FuseSharedModule,
        LayoutModule,
        SharedModule,
        MaterialModule,
        FileUploadModule,
        AppRouting,
        PrimeNgModule
    ]
})
export class AppModule
{
}
