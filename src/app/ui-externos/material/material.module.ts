import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCommonModule, MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatRadioModule} from '@angular/material/radio';
import {MdePopoverModule} from '@material-extended/mde';

@NgModule({
    declarations: [],
    imports:
        [
            CommonModule,
            MatMomentDateModule,
            MatButtonModule,
            MatCheckboxModule,
            MatDialogModule,
            MatRippleModule,
            MatMenuModule,
            MatToolbarModule,
            MatIconModule,
            MatFormFieldModule,
            MatSelectModule,
            MatDividerModule,
            MatTableModule,
            MatSortModule,
            MatInputModule,
            MatPaginatorModule,
            MatTabsModule,
            MatDatepickerModule,
            MatAutocompleteModule,
            MatChipsModule,
            MatListModule,
            MatSlideToggleModule,
            MatCardModule,
            MatExpansionModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatSnackBarModule,
            MatBadgeModule,
            MatChipsModule,
            MatMenuModule,
            MatToolbarModule,
            MatProgressButtonsModule,
            MatCommonModule,
            MatStepperModule,
            MatBottomSheetModule,
            MatRadioModule,
            MdePopoverModule
        ],
    exports:
        [
            MatMomentDateModule,
            MatButtonModule,
            MatIconModule,
            MatMenuModule,
            MatToolbarModule,
            MatCheckboxModule,
            MatDialogModule,
            MatMenuModule,
            MatRippleModule,
            MatToolbarModule,
            MatIconModule,
            MatFormFieldModule,
            MatSelectModule,
            MatDividerModule,
            MatTableModule,
            MatSortModule,
            MatInputModule,
            MatPaginatorModule,
            MatTabsModule,
            MatDatepickerModule,
            MatAutocompleteModule,
            MatChipsModule,
            MatListModule,
            MatSlideToggleModule,
            MatCardModule,
            MatExpansionModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatTooltipModule,
            MatSnackBarModule,
            MatBadgeModule,
            MatChipsModule,
            MatDialogModule,
            MatRippleModule,
            MatProgressButtonsModule,
            MatCommonModule,
            MatStepperModule,
            MatButtonToggleModule,
            MatBottomSheetModule,
            MatRadioModule,
            MdePopoverModule
        ],
    providers:
        [
            {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
            {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
            },
            {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        ]
})
export class MaterialModule
{
}
