import React from "react";
import { useForm } from "react-hook-form";


function App () {
  const {
    register, 
    formState: {errors},
    handleSubmit,
    reset
  } = useForm({mode: "onTouched"})

  const submit = (value) => {
    console.log(value)
    reset();
  }

  const validateName = (value) => {
    const containsNumber = /\d/.test(value);
    if (containsNumber) {
      return "Name should not contain digits";
    }
    return true;
  }

  const validateAge = (value) => {
    const age = parseInt(value);
    if (isNaN(age)) {
      return "Age should be a number";
    } else if (age <= 18) {
      return "Age should be greater than 18";
    }
    return true;
  }

//////////////////////////
return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(submit)}>
      <label>Name</label>
      <input {...register('name',{
           required: "Required",
           minLength: {
           value: 1,
           message: "Minimum 1 characters"},
           validate: validateName})} 
          className={errors.name ? "invalid" : ""}/>
          {errors.name && <p>{errors.name.message}</p>}


        <label>Login</label>
        <input {...register('login',{
           required: "Required",
           minLength: {
           value: 5,
           message: "Minimum 5 characters"}})} 
          className={errors.login ? "invalid" : ""}/>
          {errors.login && <p>{errors.login.message}</p>}

        <label>Age</label>
        <input {...register('age',{
           required: "Required",
           minLength: {
           value: 2,
           message: "Age should be greater than or equal to 18"},
           validate: validateAge})} 
          className={errors.age ? "invalid" : ""}/>
          {errors.age && <p>{errors.age.message}</p>}

        <label>Email</label>
        <input {...register('email',{
          required: "Required",
          pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Invalid email address"
         }
       })}
        className={errors.email ? "invalid" : ""}/>
        {errors.email && <p>{errors.email.message}</p>}
       
        <button type="submit">Sign in</button>
      </form>
    </div>
);
} 
export default App;