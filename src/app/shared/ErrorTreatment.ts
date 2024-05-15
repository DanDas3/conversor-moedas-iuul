import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class ErrorTreatment {
  constructor(private router: Router) {

  }
  redirecionar() {
    this.router.navigate(['/erro']);
  }
}
