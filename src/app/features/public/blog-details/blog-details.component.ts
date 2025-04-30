import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  url:string | null = null;

  constructor(private route: ActivatedRoute){

  }



  ngOnInit(): void {
   
    this.route.paramMap
    .subscribe({
        next: (param) => {
          this.url = param.get('url')
        }
    }
  )

    feth the blog details by url 


  }

}
