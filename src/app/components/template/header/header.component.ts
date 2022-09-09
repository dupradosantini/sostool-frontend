import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleButton(navBurger: HTMLDivElement, navMenu: HTMLDivElement){
    console.log(navBurger);
    navBurger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  }

}
