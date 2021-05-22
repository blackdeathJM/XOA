import {Pipe, PipeTransform} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {IBomba, IMotor} from '@telemetria/equipo-electrico-interface';

@Pipe({
    name: 'equipoActivo'
})
export class EquipoActivoPipe implements PipeTransform
{
    motor: IMotor =
        {
            activa: false,
            id: '',
            amperaje: 0,
            descripcion: '',
            eficiencia: 0,
            factPotencia: 0,
            fechaInstalacion: '',
            fechaRetiro: '',
            hp: 0,
            imgEvidenciaInst: [],
            imgEvidenciaRet: [],
            marca: '',
            modelo: '',
            observaciones: '',
            serie: '',
            voltaje: 0,
            motivoRetiro: ''
        };
    bomba: IBomba =
        {
            activa: false,
            descripcion: '',
            diametro: 0,
            eficiencia: 0,
            fechaInstalacion: '',
            fechaRetiro: '',
            id: '',
            imgEvidenciaInst: [],
            imgEvidenciaRet: [],
            lts: 0,
            marca: '',
            modelo: '',
            noImpulsores: 0,
            observaciones: '',
            rpm: 0,
            serie: '',
            tipo: '',
            motivoRetiro: ''
        };

    transform(value: IInstalacion, tipoEquipo: string): any
    {
        if (value !== null && value[tipoEquipo] !== null)
        {
            const equipoActivo = value[tipoEquipo].filter(v => v.activa === true);
            return equipoActivo[0];
        } else
        {
            if (tipoEquipo === 'motor')
            {
                return this.motor;
            } else
            {
                return this.bomba;

            }
        }

    }
}
