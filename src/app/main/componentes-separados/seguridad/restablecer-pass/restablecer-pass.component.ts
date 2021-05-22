import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-restablecer-pass',
    templateUrl: './restablecer-pass.component.html',
    styleUrls: ['./restablecer-pass.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RestablecerPassComponent implements OnInit
{

    restablecerPassForm: FormGroup;

    constructor(private _formBuilder: FormBuilder)
    {

    }

    ngOnInit(): void
    {
        this.restablecerPassForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

}
