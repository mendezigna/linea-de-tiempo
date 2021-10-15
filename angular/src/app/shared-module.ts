import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TimelineCardComponent } from "./modules/timeline-card/timeline-card.component";
import { MaterialModule } from "./modules/ui/material.module";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [TimelineCardComponent],
    imports: [
        MaterialModule,
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        }),
    ],
    exports: [TranslateModule, TimelineCardComponent],
})
export class SharedModule {

    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}