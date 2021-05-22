import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMedidoresComponent } from './card-medidores/card-medidores.component';
import { RegMedidorComponent } from './reg-medidor/reg-medidor.component';
import { RegReciboCfeComponent } from './reg-recibo-cfe/reg-recibo-cfe.component';
import { DetalleReciboComponent } from './detalle-recibo/detalle-recibo.component';
import { CfeComponent } from './cfe.component';
import {PlantillasModule} from '@shared/plantillas/plantillas.module';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '@ui-externos/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {WingetsModule} from '@shared/widgets/wingets.module';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';



@NgModule({
  declarations: [CardMedidoresComponent, RegMedidorComponent, RegReciboCfeComponent, DetalleReciboComponent, CfeComponent],
    imports: [
        CommonModule,
        PlantillasModule,
        FlexModule,
        MaterialModule,
        ReactiveFormsModule,
        WingetsModule,
        FileUploadModule,
        NgxBootstrapModule
    ]
})
export class CfeModule { }
