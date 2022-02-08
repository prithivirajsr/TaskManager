import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './starting-page/start/start.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [StartComponent, PagenotfoundComponent],
  imports: [CommonModule, ContentRoutingModule],
  exports: [StartComponent, PagenotfoundComponent],
})
export class ContentsModule {}
