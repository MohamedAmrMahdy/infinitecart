import { Component, Input, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl,FormsModule, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ICountry} from '../../interfaces/Country';
import {environment} from '../../../environments/environment'
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AuthStore } from '../../stores/auth.store';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , DropdownModule ,ReactiveFormsModule,
     InputTextModule, RadioButtonModule , CalendarModule,
      FileUploadModule, MenuModule, DialogModule, PasswordModule, DividerModule],
  providers: [AuthStore, UserService],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {
  readonly authStore = inject(AuthStore)
  currentUser = this.authStore.currentUser() as any
  items?:MenuItem[];
  fromSubmitted = false;
  validtionMsg = {
    fNameValMsg:"min length of first name is 3 litters",
    lNameValMsg:"min length of last name is 3 litters",
    birthDateValMsg: 'Age must be above 18',
    addressValMsg: 'too short address',
    countryValMsg: 'Must select a country',
    stateValMsg: 'state is required',
    cityValMsg: 'city is required',
    zipCodeValMsg: 'zip code is invalid',
    phoneValMsg: 'phone is invalid',
  };

  flagSrc:any;
  imgSrc:string = '';
  selectedCountry?: ICountry;
  countries: ICountry[] = [];
  visible = false;
  profileForm = new FormGroup({
    fName:new FormControl(this.currentUser.firstName, [Validators.required, Validators.minLength(3)]),
    lName:new FormControl(this.currentUser.lastName, [Validators.required, Validators.minLength(3)]),
    email:new FormControl({ value: this.currentUser.email, disabled: true}, { updateOn: 'change' }),
    birthDate: new FormControl(new Date(this.currentUser.birthDate).toLocaleDateString('en-US'),[Validators.required,this.ageValidator] ),
    address:new FormControl(this.currentUser.address.address,[Validators.required, Validators.minLength(5)]),
    country:new FormControl(this.currentUser.address.country,[Validators.required] ),
    state:new FormControl(this.currentUser.address.state, [Validators.required]),
    city:new FormControl(this.currentUser.address.city, [Validators.required]),
    zipCode: new FormControl(this.currentUser.address.postalCode, [Validators.required, Validators.pattern(/^\d{5}$/)]),
    phone:new FormControl(this.currentUser.phone, [Validators.required])    
  })

constructor (private http: HttpClient,private router: Router,private userService: UserService){}

  showDialog() {
    this.visible = true;
  }

  
    // handle form subimission
    submitProfileData(){      
      this.fromSubmitted = true;
      this.profileForm.controls.email.enable();
      
      // post data
      if(this.profileForm.valid){
        console.log('valid');
        const formData = { ...this.profileForm.value, email: this.currentUser.email};        
        console.log('local storage', JSON.parse(localStorage.getItem('userData') || '{}'));
     
        
        this.userService.updateUserData(this.currentUser.id, formData).subscribe({
          next: (response:any) => {
            console.log('response', response);
            
            this.fromSubmitted = false;
            this.router.navigate(["/"]); 
            localStorage.setItem('userData',JSON.stringify(response));
          },
          error: (err:any) => {
            console.log(err);
          }
        })
  
     
      }
      else {
        console.log('invalid')
        console.log(this.profileForm);
      }
  
  }
  
  

  ageValidator(control: AbstractControl): ValidationErrors | null {    
   
    const birthDate = new Date(control.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
  
    const minAge = 18;
    const maxAge = 100;
  
    if (age < minAge || age > maxAge) {
      console.log('age < minAge || age > maxAge');
      return {valid: false};
    }
  
    return null;
  }

// handle form validations

get isfirstNameValid(){
  return this.profileForm.controls.fName.valid
}

get isLastNameValid(){
  return this.profileForm.controls.lName.valid
}

get isBirthDateValid(){
  return this.profileForm.controls.birthDate.valid
}

get isAddressValid(){
  return this.profileForm.controls.address.valid
}

get isCountryValid(){
  return this.profileForm.controls.country.valid
}

get isStateValid(){
  return this.profileForm.controls.state.valid
}

get isCityValid(){
  return this.profileForm.controls.city.valid
}

get isZipCodeValid(){
  return this.profileForm.controls.zipCode.valid
}

get isPhoneValid(){
  return this.profileForm.controls.phone.valid
}


////////////////////////////////

get firstNameValChanged() {
  return this.profileForm.controls.fName.dirty;
}

get lastNameValChanged() {
  return this.profileForm.controls.lName.dirty;
}

get birthDateValChanged(){
  return this.profileForm.controls.birthDate.dirty
}

get addressValChanged(){
  return this.profileForm.controls.address.dirty
}

get CountryValChanged(){
  return this.profileForm.controls.country.dirty
}

get stateValChanged(){
  return this.profileForm.controls.state.dirty
}

get cityValChanged(){
  return this.profileForm.controls.city.dirty
}

get zipCodeValChanged(){
  return this.profileForm.controls.zipCode.dirty
}

get phoneValChanged(){
  return this.profileForm.controls.phone.dirty
}


//////////////////
get isSubmitted(){
  return this.fromSubmitted;
}






// handle uploading image
onUpload(event:any) {
  let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      };

}

// getting list of all countries
fetchCountries() {
  const {apiUrl, apiKey}  = environment;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  });

  this.http.get<any[]>( apiUrl+'countries', { headers }).subscribe({
    next:(response: any)=>{

      const countryList: any[] = response.data;
      countryList.forEach(countryData => {
        const country: ICountry = {
          name: countryData.name,
          phoneCode: countryData.phone_code,
          flag: countryData.href.flag
        };
        this.countries.push(country);
      });
    },
    error:(err)=> console.error('Error fetching countries:', err)
   });



}


// handle selecting country
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

this.fetchCountries();

// console.log( this.countries);
// console.log(this.currentUser.address.country);

// if(this.currentUser.address.country){
// this.selectedCountry = this.countries.find(
//     country => country.name === this.currentUser.address.country
// )
// console.log(this.selectedCountry);

// // this.flagSrc = this.selectedCountry.flag;
// }


}

}




