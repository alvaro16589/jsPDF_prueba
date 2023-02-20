import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent  implements OnInit {
 
  constructor(
    private httpClient: HttpClient,
  ) {

  }
  customersA :customer[]=[]
  ngOnInit(): void {
    this.fetchCustomers();
  }

  public pdf(): void {
      // Extraemos el
      const DATA = document.getElementById('docu');
      const doc = new jsPDF('p', 'mm', 'letter');
      const options = {
        background: 'white',
        scale: 3
      };
      html2canvas(DATA!, options).then((canvas) => {
  
        const img = canvas.toDataURL('image/PNG');
  
        // Add image Canvas to PDF
        const bufferX = 10;
        const bufferY = 10;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
   /* const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: 'letter'
    });
    doc.html(document.getElementById('docu')!, {
      callback: function (doc) {
        doc.save();
      },
      x: 1,
      y: 1,
      
      windowWidth:15
   });*/
    
  /*  doc.text("Hello world!", 1, 1);
    doc.autoPrint({variant: 'javascript'});
    doc.save("two-by-four.pdf");*/
  }

  getCustomers() {
    return this.httpClient.get<customer[]>('http://localhost:3000/api/customers');
    
  }
  fetchCustomers(){
    this.getCustomers().subscribe(custom =>{
      this.customersA = custom;
      console.log(custom);
    })
    
  }
  
  
  
}
export interface customer {
    id: number;
    name: string;
    lastName: string;
    ci: number
    born:string;
    sex: string
    createdAt: string;
    updatedAt: string;
  
  }