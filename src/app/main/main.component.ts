import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSplashScreenService} from '@plantilla/services/splash-screen.service';
import {FuseConfigService} from '@plantilla/services/config.service';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@plantilla/animations';
import {FuseNavigationService} from '@plantilla/components/navigation/navigation.service';
import {navigation} from 'app/navigation/navigation';
import {PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;
    private _unsubscribeAll: Subject<any>;

    constructor(@Inject(DOCUMENT) private document: any, private _fuseSplashScreenService: FuseSplashScreenService,
                private _fuseConfigService: FuseConfigService, private _platform: Platform, private _primeConfig: PrimeNGConfig,
                private _fuseNavigationService: FuseNavigationService)
    {
        // Get default navigation
        this.navigation = navigation;
        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);
        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');
        if (this._platform.ANDROID || this._platform.IOS)
        {
            this.document.body.classList.add('is-mobile');
        }
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) =>
            {
                this.fuseConfig = config;
                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
        // Efecto ripple de primeng
        this._primeConfig.ripple = true;
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next('');
        this._unsubscribeAll.complete();
    }
}
