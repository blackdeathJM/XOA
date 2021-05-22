import {FuseNavigation} from '@fuse/types';
import {PRESIDENCIA} from './presidencia';
import {DIR_COMERCIAL} from './dir-comercial';
import {ADMON_FINANZAS} from './dir-admon-finanzas';
import {AREA_TECNICA} from './dir-area-tecnica';
import {JURIDICO} from './dir-juridico-reg';
import {RURAL} from './dir-rural';
import {SANEAMIENTO} from './dir-saneamiento';
import {GLOBAL} from './global';
import {ADMINISTRACION} from './administracion';

export const navigation: FuseNavigation[] =
    [
        PRESIDENCIA, DIR_COMERCIAL, ADMON_FINANZAS, AREA_TECNICA, JURIDICO, RURAL, SANEAMIENTO, GLOBAL, ADMINISTRACION
    ];
