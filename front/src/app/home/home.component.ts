import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
//    header = document.querySelector("header");
//  sectionOne = document.querySelector(".home-intro");
 scrollMax = 0;
 fPage = document.getElementsByClassName("fPage");
  constructor() { }

  ngOnInit() {
    // const sectionOneOptions = {
    //   rootMargin: "-200px 0px 0px 0px"
    // };
    // const sectionOneObserver = new IntersectionObserver(function(
    //   entries,
    //   sectionOneObserver
    // ) {
    //   entries.forEach(entry => {
    //     if (!entry.isIntersecting) {
    //       this.header.classList.add("nav-scrolled");
    //     } else {
    //       this.header.classList.remove("nav-scrolled");
    //     }
    //   });
    // },
    // sectionOneOptions);
    
    // sectionOneObserver.observe(this.sectionOne);


  }
  
}


