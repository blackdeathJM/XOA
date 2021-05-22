import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparativasComponent} from './comparativas.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {PrimeNgModule} from '@ui-externos/prime-ng/prime-ng.module';


@NgModule({
    declarations: [ComparativasComponent],
    imports: [
        CommonModule,
        PlantillasModule,
        FlexLayoutModule,
        MaterialModule,
        WingetsModule,
        PrimeNgModule
    ]
})
export class ComparativasModule
{
}
