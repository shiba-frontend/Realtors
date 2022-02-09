import React,{useState} from 'react'

const RegisterForm = () => {

    const [formStep, setFormStep] = useState(1)

    const CompleteStep = ()=>{
        setFormStep(cur => cur + 1)
    }

    const renderButton =()=>{
      if(formStep > 4){
        return undefined
      } else if(formStep === 4) {
          return (<button type="submit" className="signupbtn">Submit</button>)
      } 
   
    else{
        return(<button type="button" className="signupbtn" onClick={CompleteStep}>Next</button>)
    }
}
    

    return (
        <div className="container">
            <div className="register-wizard">
                <form>
                    {formStep === 1 && (
                        <div className="step-one">
                        <h2>Step One</h2>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    )}
                    {formStep === 2 && (
                        <div className="step-two">
                        <h2>Step Two</h2>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    )}
                    {formStep === 3 && (
                        <div className="step-three">
                        <h2>Step three</h2>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    )}
                    {formStep === 4 && (
                        <div className="step-two">
                        <h2>Step Four</h2>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    )}
                    {formStep === 5 && (
                        <div className="step-two">
                        <h2>Congrats</h2>
                        
                    </div>
                    )}
                    {renderButton()}
                 </form>
            </div>
        </div>
    )
}

export default RegisterForm
