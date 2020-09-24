import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InforceTableComponent } from './inforce-table/inforce-table.component';
import { VideoComponent } from './video/video.component';
import { MaterialModule } from '../material-module';

@NgModule({
	declarations: [
		VideoComponent,
		InforceTableComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [
		VideoComponent,
		InforceTableComponent,
		MaterialModule
	]
})

export class SharedModule {}