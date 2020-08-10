import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenModel } from 'src/app/models/token.model';
import { CustomValidators } from 'ngx-custom-validators';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-token-add',
  templateUrl: './token-add.component.html',
  styleUrls: ['./token-add.component.css']
})
export class TokenAddComponent implements OnInit {

  form: FormGroup;
  model: TokenModel;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private toastrService: ToastrService
  ) {
    this.form = this.fb.group({
      tokenAddress: ['', [Validators.required, CustomValidators.rangeLength([42, 42])]]
    });
  }

  ngOnInit(): void {
  }

  async add() {
    try {
      const address = this.form.controls.tokenAddress.value;
      await this.tokenService.add(address);
      const toastr = this.toastrService.success('Success', 'Token added!', {
        progressBar: true
      });

      if (toastr) {
        toastr.onHidden.subscribe(() => {
          this.form.reset();
        });
      }
    } catch (err) {
      console.log(err.message);

      let message: string = '';
      if (err.message.includes('contract not deployed'))
        message = 'Contract not deployed!'
      else if (err.message.includes('call exception'))
        message = 'Is not a ERC20 contract!'
      else
        message = 'Error to add token!';

      this.toastrService.error('Error', message, {
        progressBar: true
      });
    }
  }

}
