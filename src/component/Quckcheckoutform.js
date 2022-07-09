import '../App.css';
import { useForm } from 'react-hook-form';



function Quckcheckoutform() {
  const { register, handleSubmit } = useForm();


const onSubmit = (data) => {
  console.log(data)
}


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title">Quick Check Out</div>
        <div class="form-group">
          <label for="inputAddress"></label>
          <input type="text" {...register('fullname')} class="form-control" id="inputAddress" placeholder="Your Full Name" />
        </div>
        <div class="form-group">
          <label for="inputAddress"></label>
          <textarea class="form-control" {...register('address')} id="exampleFormControlTextarea1" placeholder="Address" rows="3"></textarea>
        </div><br />
        <div class="row">
          <div class="col">
            <input type="text" {...register('phone')} class="form-control" placeholder="Phone Number" />
          </div>
        </div> <br />

        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary p-3">Continue to Shipping</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Quckcheckoutform;
