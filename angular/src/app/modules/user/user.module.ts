import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../ui/material.module';
import { ThemeModule } from '../ui/theme.module';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';

const route : Routes = [
    {
        path: 'configuration',
        component: ConfigurationComponent,
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    }
]

@NgModule({
    declarations : [ConfigurationComponent, ProfilePageComponent],
    imports: [
        RouterModule.forChild(route),
        SharedModule,
        MaterialModule,
        ThemeModule
    ],
    providers: [TranslateService]
}) export class UserModule {}