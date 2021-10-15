import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../ui/material.module';
import { ThemeModule } from '../ui/theme.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/guards/auth.guard';

const route : Routes = [
    {
        path: 'configuration',
        component: ConfigurationComponent,
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfilePageComponent
    }
]

@NgModule({
    declarations : [ConfigurationComponent, ProfilePageComponent],
    imports: [
        RouterModule.forChild(route),
        SharedModule,
        MaterialModule,
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule
    ],
    providers: [TranslateService, UserService]
}) export class UserModule {}