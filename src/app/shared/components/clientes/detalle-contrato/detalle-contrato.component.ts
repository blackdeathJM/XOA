import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-detalle-contrato',
    templateUrl: './detalle-contrato.component.html',
    styleUrls: ['./detalle-contrato.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class DetalleContratoComponent implements OnInit
{

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

}
