import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../ui/material.module';
import { ThemeModule } from '../ui/theme.module';

const route : Routes = [
    {
        path: 'configuration',
        component: ConfigurationComponent,
    },
]

@NgModule({
    declarations : [ConfigurationComponent],
    imports: [
        RouterModule.forChild(route),
        SharedModule,
        MaterialModule,
        ThemeModule
    ],
    providers: [TranslateService]
}) export class UserModule {}