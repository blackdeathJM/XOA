import {MatProgressButtonOptions} from 'mat-progress-buttons';

export function botonGuardarConfig(active: boolean = false, fontIcon: string = 'save', text: string = 'Guardar', type: string = 'submit'): MatProgressButtonOptions
{
    return {
        active,
        barColor: 'accent',
        buttonColor: 'primary',
        buttonIcon: {
            fontIcon,
            inline: true
        },
        customClass: 'altoAnchoButton100',
        disabled: false,
        fab: false,
        flat: false,
        fullWidth: true,
        icon: {
            color: 'primary',
        },
        mode: 'indeterminate',
        raised: true,
        spinnerColor: 'warn',
        spinnerSize: 18,
        spinnerText: 'Guardando...',
        stroked: true,
        text,
        type,
        value: 0
    };
}
