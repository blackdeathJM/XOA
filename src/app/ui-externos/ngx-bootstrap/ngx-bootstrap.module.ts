import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionConfig, AccordionModule} from 'ngx-bootstrap/accordion';
import {NgxPaginationModule} from 'ngx-pagination';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {MdePopoverModule} from '@material-extended/mde';

export const getAccordionConfig = (): AccordionConfig => Object.assign(new AccordionConfig(), {closeOthers: true});

const maskConfigFunction: () => Partial<IConfig> = () =>
    ({
        validation: false,
    });

@NgModule({
    declarations: [],
    providers: [{provide: AccordionConfig, useFactory: getAccordionConfig}],
    imports:
        [
            CommonModule,
            NgxPaginationModule,
            NgxMaskModule.forRoot(maskConfigFunction),
            AccordionModule,
            ProgressbarModule,
            MdePopoverModule
        ],
    exports:
        [
            NgxPaginationModule,
            AccordionModule,
            ProgressbarModule,
            MdePopoverModule
        ]
})
export class NgxBootstrapModule
{
}
