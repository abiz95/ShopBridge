import { FormGroup } from '@angular/forms';

export function validatePrice(controlName: string){
    return (formGroup: FormGroup) => {
        
        const control = formGroup.controls[controlName];

        if (control.value < 1) {
            control.setErrors({ priceLimit: true });
        } else {
            control.setErrors(null);
        }
    }
}
