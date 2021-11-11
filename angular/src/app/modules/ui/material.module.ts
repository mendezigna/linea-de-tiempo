import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollingModule } from '@angular/cdk/scrolling'; 
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
@NgModule({
    exports: [
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatOptionModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDividerModule,
        MatRadioModule,
        NgbCarouselModule,
        ScrollingModule,
        MatAutocompleteModule
    ]
}) export class MaterialModule { }
