import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { NavComponent } from "./nav/component";
import { HomeComponent } from "./home/component";

@NgModule({
	imports: [BrowserModule],
	declarations: [HomeComponent, NavComponent],
	bootstrap: [HomeComponent]
})

export class AppModule { }