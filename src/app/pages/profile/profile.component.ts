import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl,FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { count } from 'rxjs';

interface Country {
  name: string;
  phoneCode: string;
  flag: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , DropdownModule ,ReactiveFormsModule,
     InputTextModule, RadioButtonModule , CalendarModule,
      FileUploadModule, MenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {
  fromSubmitted = false;
  items?:MenuItem[];
  fNameValMsg="min length of first name is 3 litters";
  lNameValMsg="min length of last name is 3 litters";
  emailValMsg = "email invalid";
  selectedCountry?: Country;
  flagSrc:any;
  countries: Country[] = [];
  value: any;
  imgSrc:string = '';
  profileForm = new FormGroup({
    fName:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    lName:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    address:new FormControl(null,[Validators.required, Validators.minLength(20)]),
    country:new FormControl(null),
    phone:new FormControl('')
  })

  constructor (private http: HttpClient){

  }
  get isfirstNameValid(){    
    return this.profileForm.controls.fName.valid
  }
  

  get isLastNameValid(){
    
    return this.profileForm.controls.lName.valid
  }

 
  get isEmailValid(){
    return this.profileForm.controls.email.valid
  }

  

  get isSubmitted(){
    return this.fromSubmitted;
  }


  get firstNameValChanged() {
    return this.profileForm.controls.fName.dirty;
  }

  get lastNameValChanged() {
    
    return this.profileForm.controls.lName.dirty;
  }
  
  get emailValChanged() {
    return this.profileForm.controls.email.dirty;

  }
  
  selectedCountryHandler(event:any) {
     let selectedCountryName = this.profileForm.controls.country.value;

     console.log(this.profileForm.controls.country.value);
     this.selectedCountry = this.countries.filter((country: any) => country.name === selectedCountryName)
     .map((country: any) => ({
       name: country.name,
       phoneCode: country.phoneCode,
       flag: country.flag
     }))[0];

     this.flagSrc = this.selectedCountry.flag;
     this.profileForm.controls.phone.setValue('+' + this.selectedCountry.phoneCode)
  }

  submitProfileData(){
    this.fromSubmitted = true;
    if(this.profileForm.valid){
      console.log(this.profileForm);
      this.profileForm.reset();
      this.fromSubmitted = false;              
    }
    else {
      console.log('invalid')
      if(!this.profileForm.controls.fName.valid) console.log(this.fNameValMsg)
      if(!this.profileForm.controls.lName.valid) console.log(this.lNameValMsg)
      if(!this.profileForm.controls.email.valid) console.log(this.emailValMsg)
    }

}


onUpload(event:any) {
  // console.log("onUpload()")
  // console.log(event);
  // console.log( event.files[0].name);

  let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      };

  // console.log(decodeURIComponent(event.files[0].name));
  // console.log(event.target.files[0])
  // const file = event.files;
  // console.log(file)

  // if(file.url)
  //   console.log(file.url)
}

// onFileUpload(event:any) {
//   console.log("onFileUpload()")
//   console.log(event)

// }


ngOnInit(){

  this.items = [
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
    },
    {
      label: "Security",
      icon: "pi pi-fw pi-lock",
    },
    {
      label: "Orders",
      icon: "pi pi-fw pi-bars",

    },
    {
      label: "Wishlists",
      icon: "pi pi-fw pi-heart",
    },
    {
      label: "Returns",
      icon: "pi pi-fw pi-spinner",
    },
];
const apiKey = '479|NTS6CcO0iYqRXqJX0Nnt6KWv8gG87pbuliG50MXg';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
});

this.http.get<any[]>('https://restfulcountries.com/api/v1/countries', { headers }).subscribe(
  (response: any) => {
    const countryList: any[] = response.data;
    console.log(countryList);
    countryList.forEach(countryData => {
      const country: Country = {
        name: countryData.name,
        phoneCode: countryData.phone_code,
        flag: countryData.href.flag
      };
      this.countries.push(country);
    });

  },
  error => {
    console.error('Error fetching countries:', error);
  }
);

console.log(this.countries);

} 

}




