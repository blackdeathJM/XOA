import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Ng2FileUploadComponent} from '@shared/components/subidas/ng2-file-upload/ng2-file-upload.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {FileUploadModule} from 'ng2-file-upload';
import { IplabSubidaSimpleComponent } from './iplab-subida-simple/iplab-subida-simple.component';
import { IploagSubidaMultipleComponent } from './iploag-subida-multiple/iploag-subida-multiple.component';
import {FileUploadModule as ipLabUpload} from '@iplab/ngx-file-upload';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations:
        [
            Ng2FileUploadComponent,
            IplabSubidaSimpleComponent,
            IploagSubidaMultipleComponent
        ],
    exports:
        [
            Ng2FileUploadComponent,
            IplabSubidaSimpleComponent,
            IploagSubidaMultipleComponent
        ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FileUploadModule,
        ipLabUpload,
        ReactiveFormsModule
    ]
})
export class SubidasModule
{
}
