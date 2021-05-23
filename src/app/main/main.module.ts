import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {fuseConfig} from '../fuse-config';
import {Router} from '@angular/router';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainRoutingModule} from './main.routing';
import {FuseSharedModule} from '@plantilla/shared.module';
import {MaterialModule} from '@ui-externos/material/material.module';
import {JwtModule} from '@auth0/angular-jwt';
import {FuseModule} from '@plantilla/fuse.module';
import {MatIconRegistry} from '@angular/material/icon';

import {MainComponent} from './main.component';
import {NgxBootstrapModule} from '@ui-externos/ngx-bootstrap/ngx-bootstrap.module';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import {NgxsModuleGlobal} from '../ngxs-global/ngxs-global.module';
import {GraphQLModule} from '../@core/modules/graphql/graphql.module';
import {HttpClientModule} from '@angular/common/http';

import {PdfMakeWrapper} from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {LightboxModule} from 'ngx-lightbox';
import {QRCodeModule} from 'angularx-qrcode';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
    declarations:
        [
            MainComponent,
            BottomSheetComponent
        ],
    imports:
        [
            BrowserModule,
            HttpClientModule,
            BrowserAnimationsModule,
            GraphQLModule,
            FuseModule.forRoot(fuseConfig),
            FuseSharedModule,
            MaterialModule,
            NgxBootstrapModule,
            SweetAlert2Module.forRoot({provideSwal: () => import('sweetalert2/src/sweetalert2')}),
            MainRoutingModule,
            LightboxModule,
            QRCodeModule,
            NgxsModuleGlobal,
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => localStorage.getItem('token'),
                    skipWhenExpired: false,
                    throwNoTokenError: true
                    // whitelistedDomains: ['http://localhost:5002', 'ws://localhost:5002', 'http://localhost:5002/graphql'],
                }
            }),
        ],
    schemas:
        [
            CUSTOM_ELEMENTS_SCHEMA
        ],
    providers:
        [],
    bootstrap: [MainComponent]
})
export class MainModule
{
    constructor(private router: Router, _iconRegistry: MatIconRegistry, _sanitizer: DomSanitizer)
    {
        _iconRegistry.addSvgIcon('PENDIENTE', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/pendiente.svg'));
        _iconRegistry.addSvgIcon('RECHAZADO', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/rechazado.svg'));
        _iconRegistry.addSvgIcon('APROBADO', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/aprobado.svg'));
        _iconRegistry.addSvgIcon('ENVIADO', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/enviado.svg'));
        _iconRegistry.addSvgIcon('TERMINADO', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/terminado.svg'));
        _iconRegistry.addSvgIcon('ACUSE', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/acuse.svg'));
        _iconRegistry.addSvgIcon('ENTREGADO', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/entregado.svg'));

        _iconRegistry.addSvgIcon('instalacion', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/instalacion.svg'));
        _iconRegistry.addSvgIcon('grafica', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/grafica.svg'));
        _iconRegistry.addSvgIcon('equipo', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/equipo.svg'));
        _iconRegistry.addSvgIcon('consumoAgua', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/consumoAgua.svg'));
        _iconRegistry.addSvgIcon('cfe', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/cfe.svg'));
        _iconRegistry.addSvgIcon('general', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/general.svg'));
        _iconRegistry.addSvgIcon('telemetria', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/info-telemetria.svg'));


        _iconRegistry.addSvgIcon('plc', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/plc.svg'));
        _iconRegistry.addSvgIcon('radio', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/radio.svg'));
        _iconRegistry.addSvgIcon('switch', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/switch.svg'));
        _iconRegistry.addSvgIcon('repetidor', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/repetidor.svg'));
        _iconRegistry.addSvgIcon('camara', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/generales/camara.svg'));
    }
}
