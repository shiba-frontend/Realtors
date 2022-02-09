import React,{useState, useRef, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useHistory} from 'react-router-dom';
import {BaseUrl} from '../Common/Comon';
//import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import placeholder from './images/no-image.png';

const Register = () => {
    const [stepcount, setstepcount] = useState(1);
    const [weeklydata, setweeklydata] = useState();
    const [checkbox, setcheckbox] = useState(false);
    const [checkbox1, setcheckbox1] = useState(false)
    const [checkbox2, setcheckbox2] = useState(false)
    const [checkbox3, setcheckbox3] = useState(false)
    const [checkbox4, setcheckbox4] = useState(false)
    const [checkbox5, setcheckbox5] = useState(false)
    const [uploadFile, setUploadFile] = useState("");
    const [uploadFile1, setUploadFile1] = useState("");
    const [profileimage, setprofileimage] = useState();
    const [userId, setuserId] = useState();
    const [AreaList, setAreaList] = useState([]);
    const [DataAreaList, setDataAreaList] = useState([]);
    const [SpecializationList, setSpecializationList] = useState([]);
    const [DataSpecializationList, setDataSpecializationList] = useState([]);
    const [SkillList, setSkillList] = useState([]);
    const [DataSkillList, setDataSkillList] = useState([]);
    const [industryList, setindustryList] = useState([]);
    const [DataindustryList, setDataindustryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, getValues, handleSubmit,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    const [Emailchecking, setEmailchecking] = useState();
    const [phonechecking, setphonechecking] = useState();
    const [errorcheck, seterrorcheck] = useState(false);
    const [errorrepeatcheck, seterrorrepeatcheck] = useState(false);
    

    const password = useRef({});
    password.current = watch("Password", "");
    const Apiurl = BaseUrl();
    let history = useHistory();


    const notify = () => {

        toast.warn("File Size too big  !", {
            position: toast.POSITION.TOP_CENTER,
          });
    };

    console.log(userId);

    const selectimage = (e) =>{
        var file = e.target.files[0];
        setprofileimage({profileimage:e.target.files[0]})
        var reader = new FileReader();
        //var url = reader.readAsDataURL(file);
        //setUploadFile(url)
        reader.onload = function(e) {

            const fsize = file.size;
            const fileSize = Math.round((fsize / 1024));
            if(fileSize >= 1000)
            {
                notify();
                
            }
            else
            {
                setUploadFile(e.target.result)
            }

            
          }
          reader.readAsDataURL(file);    
    }

    //console.log(profileimage)

    const selectimage1 = (e) =>{
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            const fsize = file.size;
            const fileSize = Math.round((fsize / 1024));
            if(fileSize >= 1000)
            {
                notify();
                
            }
            else
            {
                setUploadFile1(e.target.result)
            }
           
          }
          reader.readAsDataURL(file);
    }

   // (e.target.files[0])
    const checkcheckbox = (e)=>{
        const checked = e.target.checked;
        if (checked) {
            setcheckbox(true)
           } else {
            setcheckbox(false)
           } 
    }
    const checkcheckbox1 = (e)=>{
        const checked = e.target.checked;
        if (checked) {
            setcheckbox1(true)
           } else {
            setcheckbox1(false)
           } 
    }

    const checkcheckbox2 = (e)=>{
        const checked = e.target.checked;
        if (checked) {
            setcheckbox2(true)
           } else {
            setcheckbox2(false)
           } 
    }

    const checkcheckbox3 = (e)=>{
        const checked = e.target.checked;
        if (checked) {
            setcheckbox3(true)
           } else {
            setcheckbox3(false)
           } 
    }

    const checkcheckbox4 = (e)=>{
        const checked = e.target.checked;
        if (checked) {
            setcheckbox4(true)
           } else {
            setcheckbox4(false)
           } 
    }

    const checkcheckbox5 = (e)=>{
        const checked = e.target.checked;
        if (checked) {
            setcheckbox5(true)
           } else {
            setcheckbox5(false)
           } 
    }

    if(stepcount > 1){
        var style= "active"
    }
    if(stepcount > 2){
        var style1= "active"
    }
    if(stepcount > 3){
        var style2= "active"
    }

    
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Registration';
      }, [])


      
    useEffect(() => {
        
        fetch(`${Apiurl}/master/get-business-hours-list`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            setweeklydata(responseJson.Content);
            //console.log(responseJson)
          })

    }, [])


    useEffect(() => {
        fetch(`${Apiurl}/master/get-experts-areas-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            setAreaList(responseJson.Content);
          })
    }, [])


    useEffect(() => {
        
        fetch(`${Apiurl}/master/get-experts-specializations-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            setSpecializationList(responseJson.Content);
          })

    }, [])


    useEffect(() => {
        
        fetch(`${Apiurl}/master/skill-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            setSkillList(responseJson.Content);
           // console.log(responseJson.Content)
          })

    }, [])


    useEffect(() => {
        
        fetch(`${Apiurl}/master/get-industry-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            setindustryList(responseJson.Content);
           // console.log(responseJson.Content)
          })

    }, [])

    
      
     const Arealisted = () => {  
        return (AreaList.filter(area => area.StatusId == 1).map(data => ({
            Id:data.Id, 
            label: data.ServiceAreaName, 
            //value: data.Id 
        })
    ))  
    } 

    const Specializationlisted = () => {  
        return (SpecializationList.filter(special => special.StatusId == 1).map(data => ({
            Id:data.Id, 
            SpecializationsName: data.SpecializationsName, 
            //value: data.Id 
        })
    ))  
    } 

    const SkillListeddata = () => {  
        return (SkillList.filter(skill => skill.StatusId == 1).map(data => ({
            Id:data.Id, 
            SkillName: data.SkillName, 
            //value: data.Id 
        })
    ))  
    } 

    const industrylistdata = () => {  
        return (industryList.filter(industry => industry.StatusId == 1).map(data => ({
            Id:data.Id, 
            IndustryName: data.IndustryName, 
            //value: data.Id 
        })
    ))  
    } 

    
    // const HandleMultiSelect = (e)=>{
    //     setDataAreaList(e)
    //   console.log(DataAreaList)
    // }
    

    const EmailValue = getValues("Email");
    const PhoneValue = getValues("Phone");


    const onChangeHandler = e => {
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "Email": EmailValue
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${Apiurl}/master/check-user-email-exists`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.Content === true){
                seterrorcheck(true)
                setEmailchecking(result.Message)
            }
            else
            {
                seterrorcheck(false)
            }
           
        })
        .catch(error => console.log('error', error));
  };

  const onChangeHandler1 = e => {

    var InputId = document.getElementById("PhoneNo");

    var pwList = [InputId.value];

    for (var p = 0; p < pwList.length; p++) {
        var pw = pwList[p];
        var check = (/^(.)\1+$/.test(pw));           
        if (check == true) {
            seterrorrepeatcheck(true)
        }
        else{
            seterrorrepeatcheck(false)
        }
    }

    


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "Phone": PhoneValue
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${Apiurl}/master/check-user-phone-exists`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.Content === true){
                seterrorcheck(true)
                setphonechecking(result.Message)
            }
            else
            {
                seterrorcheck(false)
            }
           
        })
        .catch(error => console.log('error', error));

  };

//console.log(Emailchecking)

    const onSubmit = async (data) =>{
        setLoading(true);
        var ExpertId = 0;
        var PImage = "";
        var cImage = "";



        //profile Image

        var formdata = new FormData();
        formdata.append("Image", data.Image[0]);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

       const res = await fetch(`${Apiurl}/file/upload-profile-image`, requestOptions)
        .then(res => res.json())
        .then(result => {
            PImage = result.Content;
            //console.log(result);
            //console.log("Upload Profile:", result);
        })
        .catch(error => console.log('error', error));

        //Cover Image

        var coverformdata = new FormData();
        coverformdata.append("Image", data.Image1[0]);

        var requestOptions = {
        method: 'POST',
        body: coverformdata,
        redirect: 'follow'
        };

        const response1 = await fetch(`${Apiurl}/file/upload-cover-image`, requestOptions)
        .then(response1 => response1.json())
        .then(result => {
            cImage = result.Content;
            //setresponsecoverimage(filename)
           // console.log(filename)
           //console.log("Upload Cover", result );
        })
        .catch(error => console.log('error', error));


        //Account Data

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "FirstName": data.FirstName,
        "LastName": data.LastName,
        "Email": data.Email,
        "Phone": data.Phone,
        "Password": data.Password,
        "ProfileImage":PImage,
        "CoverImage": cImage
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log("Account Data raw", raw);
        const response2 = await  fetch(`${Apiurl}/expert/add-account-details`, requestOptions)
        .then(response2 => response2.json())
        .then(result => {
            setLoading(false);
            ExpertId = result.Content.ExpertId
            //setuserId(ById)
            //console.log("Step=Account", result);
            businessinfo();
            serviceDetails();
            SkillDetails();
            Industry();

            if(result.IsSuccess === true)
            {
                Swal.fire({
                    title: 'Your Registration has been Successfully done !',
                    //text: "You won't be able to revert this!",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("./login")
                    }
                  })
    
                //console.log("Step=seven", result);
            }
            else if(result.IsSuccess === false)
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }

        })
    .catch(error => {
        console.log('error', error);
        setLoading(false);
    });




        //Business Info

        function businessinfo(){
            //console.log("Step=Business", ExpertId);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "ExpertId": ExpertId,
                "BusinessName": data.BusinessName,
                "BusinessDescription": data.BusinessDescription,
                "BusinessAddress": data.BusinessAddress,
                "BusinessPostcode": data.BusinessPostcode,
                "BusinessWebsite": data.BusinessWebsite,
                "BusinessCategory": data.BusinessCategory,
                "BusinessSubCategory": data.BusinessSubCategory,
                "BusinessMinPrice": data.BusinessMinPrice,
                "BusinessMaxPrice": data.BusinessMaxPrice,
                "BusinessMonStartTimeId": data.BusinessMonStartTimeId,
                "BusinessMonEndTimeId": data.BusinessMonEndTimeId,
                "BusinessTueStartTimeId": data.BusinessTueStartTimeId,
                "BusinessTueEndTimeId": data.BusinessTueEndTimeId,
                "BusinessWedStartTimeId":data.BusinessWedStartTimeId,
                "BusinessWedEndTimeId":data.BusinessWedEndTimeId,
                "BusinessThuStartTimeId": data.BusinessThuStartTimeId,
                "BusinessThuEndTimeId": data.BusinessThuEndTimeId,
                "BusinessFriStartTimeId": data.BusinessFriStartTimeId,
                "BusinessFriEndTimeId": data.BusinessFriEndTimeId,
                "BusinessSatStartTimeId": data.BusinessSatStartTimeId,
                "BusinessSatEndTimeId": data.BusinessSatEndTimeId
            });
    
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            console.log("Step=four", raw);
           const response3 = fetch(`${Apiurl}/expert/add-business-info-details`, requestOptions)
           .then(response3 => response3.json())
            .then(result => {
                console.log("Business-Info", result);
            })
            .catch(error => console.log('error', error));

        }



        //Service Details

        function serviceDetails(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "ExpertId": ExpertId,
        "AreaServedIds": DataAreaList,
        "SpecializationsIds": DataSpecializationList,
        "Experience": ""
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        //console.log("service-Details", raw);
       const response4 = fetch(`${Apiurl}/expert/add-business-service-details`, requestOptions)
       .then(response4 => response4.json())
       .then(result => {
        //console.log("service-Details", result);
    })
        .catch(error => console.log('error', error));
        }
        

    //Skill Details

    function SkillDetails(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "ExpertId": ExpertId,
            "SkillIds": DataSkillList
          });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
       const response5 = fetch(`${Apiurl}/expert/add-business-skill-details`, requestOptions)
       .then(response5 => response5.json())
       .then(result => {
        //console.log("Skill-Details", result);
    
    })
        .catch(error => console.log('error', error));
    }


    //Industry

    function Industry(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "ExpertId": ExpertId,
            "IndustryIds": DataindustryList
          });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
       const response6 = fetch(`${Apiurl}/expert/add-business-industry-details`, requestOptions)
       .then(response6 => response6.json())
       .then(result => {
        //console.log("Industry-Details", result);
    })
        .catch(error => console.log('error', error));
    }

    }
    


//console.log(SkillList)
    
    return (
        <div className="container">
            <div className="register-wizard">
            <ul>
           
                <li className="active">
                    <div className="steo-circle">
                        <i className="far fa-user"></i>
                    </div>
                    <h5>Create Account</h5>
                    <p>Enter Your username password details</p>
                </li>
          
                
                <li className={style}>
                    <div className="steo-circle">
                    <i class="fas fa-cog"></i>
                    </div>
                    <h5>Business Information</h5>
                    <p>Add your all relator related listing data.</p>
                </li>
                <li className={style1}>
                    <div className="steo-circle">
                    <i className="far fa-map"></i>
                    </div>
                    <h5>Business Service/Specialization</h5>
                    <p>Add your service area and skill.</p>
                </li>
                <li className={style2}>
                    <div className="steo-circle">
                    <i className="far fa-image"></i>
                    </div>
                    <h5>Skill/Industry</h5>
                    <p>Add your skill and industry details.</p>
                </li>
            </ul>
       

        <form onSubmit={handleSubmit(onSubmit)}>
        {stepcount === 1 ?(
            <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <input type="text" name="FirstName" {...register("FirstName",{required:true,maxLength: 10,pattern: /[A-Za-z]/ })} className="form-control" placeholder="First Name" />

                    {errors.FirstName && errors.FirstName.type === "required" && (<p className="errormsg">Field is required</p>)}
                    {errors.FirstName && errors.FirstName.type === "maxLength" && (<p className="errormsg">Maximam 10 words</p>)}
                    {errors.FirstName && errors.FirstName.type === "pattern" && (<p className="errormsg">Not allowed numeric</p>)}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <input type="text" name="LastName" {...register("LastName",{required:true,maxLength: 10})}  
                    className="form-control" placeholder="Last Name" />
                    {errors.LastName && errors.LastName.type === "required" && (<p className="errormsg">Field is required</p>)}
                    {errors.LastName && errors.LastName.type === "maxLength" && (<p className="errormsg">Maximam 10 words</p>)}
                </div>
            </div>
            
            <div className="col-md-6">
                <div className="form-group">
                    <input type="email" name="Email" {...register("Email",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} className="form-control" placeholder="Email"
                    onBlur={(event) => onChangeHandler(event)}
                    autoComplete="off"
                    />

                    {errors.Email && errors.Email.type === "required" && (<p className="errormsg">Field is required</p>)}
                    {errors.Email && errors.Email.type === "pattern" && (<p className="errormsg">Email is not valid</p>)}
                    {errorcheck ? <p className="errormsg">{Emailchecking}</p>:null}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <input type="text" maxLength="10" name="Phone" {...register("Phone",{required:true,pattern:/^[0-9\b]+$/,maxLength:10, minLength:10})} id="PhoneNo" className="form-control" placeholder="Phone Number"
                    onBlur={(event) => onChangeHandler1(event)}
                    />

                    {errors.Phone && errors.Phone.type === "required" && (<p className="errormsg">Field is required</p>)}
                    {errors.Phone && errors.Phone.type === "pattern" && (<p className="errormsg">Phone number is not valid</p>)}
                    {errors.Phone && errors.Phone.type === "maxLength" && (<p className="errormsg">Maximam 10 Digit</p>)}
                    {errors.Phone && errors.Phone.type === "minLength" && (<p className="errormsg">Minimum 10 Digit</p>)}

                    {errorcheck ? <p className="errormsg">{phonechecking}</p>:null}
                    {errorrepeatcheck ? <p className="errormsg">Phone number is not valid</p>:null}
                    
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <input type="password" name="Password" {...register("Password",{required:true,minLength:6})} className="form-control" placeholder="Password" />

                    {errors.Password && errors.Password.type === "required" && (<p className="errormsg">Field is required</p>)}
                    {errors.Password && errors.Password.type === "minLength" && (<p className="errormsg">Must have atleast 6 characters</p>)}

                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <input type="password" name="password_repeat" {...register("password_repeat",{
                        validate: value =>
                        value === password.current || "The passwords do not match"
                    })} className="form-control" placeholder="Confirm Password" />

                    {errors.password_repeat && <p className="errormsg">{errors.password_repeat.message}</p>}
                </div>
            </div>
        </div>
        ) : null
    }
    {stepcount === 2 ?(
        <div className="row">
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessName" {...register("BusinessName",{required:true})} className="form-control" placeholder="Business Name" />

                {errors.BusinessName && errors.BusinessName.type === "required" && (<p className="errormsg">Field is required</p>)}

            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessAddress" {...register("BusinessAddress",{required:"true"})} className="form-control" placeholder="Address" />

                {errors.BusinessAddress && errors.BusinessAddress.type === "required" && (<p className="errormsg">Field is required</p>)}

            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" maxLength="6" name="BusinessPostcode" {...register("BusinessPostcode",{
                    required:true,pattern:/^[0-9\b]+$/,maxLength:6
                })} className="form-control" placeholder="Post Code" />

                {
                    errors.BusinessPostcode && errors.BusinessPostcode.type === "required" && (<p className="errormsg"> Field is required </p>)
                }
                {
                    errors.BusinessPostcode && errors.BusinessPostcode.type === "pattern" && (<p className="errormsg"> Post Code Should be Numeric </p>)
                }

            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessWebsite" {...register("BusinessWebsite")} className="form-control" placeholder="Website Address" />
                
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessCategory" {...register("BusinessCategory")} className="form-control" placeholder="Category Service" />

            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessSubCategory" {...register("BusinessSubCategory")} className="form-control" placeholder="Sub-category" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessMaxPrice" {...register("BusinessMaxPrice",{required:true,pattern:/^[0-9\b]+$/})}  className="form-control" placeholder="Price Range Max" />

                {
                    errors.BusinessMaxPrice && errors.BusinessMaxPrice.type === "pattern" && (<p className="errormsg"> Price range should be Numeric </p>)
                }
                {
                    errors.BusinessMaxPrice && errors.BusinessMaxPrice.type === "required" && (<p className="errormsg"> Field is required </p>)
                }
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <input type="text" name="BusinessMinPrice" {...register("BusinessMinPrice",{required:true,pattern:/^[0-9\b]+$/})} className="form-control" placeholder="Price Range Min" />

                {
                    errors.BusinessMinPrice && errors.BusinessMinPrice.type === "pattern" && (<p className="errormsg"> Price range should be Numeric </p>)
                }
                {
                    errors.BusinessMinPrice && errors.BusinessMinPrice.type === "required" && (<p className="errormsg"> Field is required </p>)
                }
            </div>
        </div>
        <div className="col-md-12">
            <div className="form-group">
                <textarea className="form-control" name="BusinessDescription" {...register("BusinessDescription")} rows="4" placeholder="Description of your business">
                </textarea>
                
            </div>
        </div>
        <div className="col-lg-8">
					<div className="weekschedual">
						<div className="row align-items-center">
							<div className="col-lg-3 col-12 new">
								 <div className="form-group">
								  <input type="checkbox" onClick={(e) => {
                                    checkcheckbox(e)}} id="week1"/>
								  <label htmlFor="week1">Monday</label>
								</div>
							</div>
							<div className="col-lg-4 col-5 ">
                                <select  className="stepselect" name="BusinessMonStartTimeId" {...register("BusinessMonStartTimeId")} disabled={checkbox ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
							<div className="col-lg-1 col-2">
								<span className="stepto">To</span>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessMonEndTimeId" {...register("BusinessMonEndTimeId")} disabled={checkbox ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
						</div>
					</div>
					<div className="weekschedual">
                    <div className="row align-items-center">                                                                                 
							<div className="col-lg-3 col-12 new">
								 <div className="form-group">
								  <input type="checkbox" id="week2" onClick={(e) => {
                                    checkcheckbox1(e)}}   />
								  <label htmlFor="week2">Tuesday</label>
								</div>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessTueStartTimeId" {...register("BusinessTueStartTimeId")} disabled={checkbox1 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
							<div className="col-lg-1 col-2">
								<span className="stepto">To</span>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessTueEndTimeId" {...register("BusinessTueEndTimeId")} disabled={checkbox1 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
						</div>
					</div>
					<div className="weekschedual">
                    <div className="row align-items-center">
							<div className="col-lg-3 col-12 new">
								 <div className="form-group">
								  <input type="checkbox" onClick={(e) => {
                                    checkcheckbox2(e)}} id="week3"/>
								  <label htmlFor="week3">Wednesday</label>
								</div>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessWedStartTimeId" {...register("BusinessWedStartTimeId")} disabled={checkbox2 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
							<div className="col-lg-1 col-2">
								<span className="stepto">To</span>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessWedEndTimeId" {...register("BusinessWedEndTimeId")} disabled={checkbox2 ? false : true}>>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
						</div>
					</div>
					<div className="weekschedual">
                    <div className="row align-items-center">
							<div className="col-lg-3 col-12 new">
								 <div className="form-group">
								  <input type="checkbox" onClick={(e) => {
                                    checkcheckbox3(e)}} id="week4"/>
								  <label htmlFor="week4">Thrusday</label>
								</div>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessThuStartTimeId" {...register("BusinessThuStartTimeId")} disabled={checkbox3 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
							<div className="col-lg-1 col-2">
								<span className="stepto">To</span>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessThuEndTimeId" {...register("BusinessThuEndTimeId")} disabled={checkbox3 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
						</div>
					</div>
					<div className="weekschedual">
                    <div className="row align-items-center">
							<div className="col-lg-3 col-12 new">
								 <div className="form-group">
								  <input type="checkbox" onClick={(e) => {
                                    checkcheckbox4(e)}} id="week5"/>
								  <label htmlFor="week5">Friday</label>
								</div>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessFriStartTimeId" {...register("BusinessFriStartTimeId")} disabled={checkbox4 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
							<div className="col-lg-1 col-2">
								<span className="stepto">To</span>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessFriEndTimeId" {...register("BusinessFriEndTimeId")} disabled={checkbox4 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
						</div>
					</div>
					<div className="weekschedual">
                    <div className="row align-items-center">
							<div className="col-lg-3 col-12 new">
								 <div className="form-group">
								  <input type="checkbox" onClick={(e) => {
                                    checkcheckbox5(e)}} id="week6"/>
								  <label htmlFor="week6">Saturday</label>
								</div>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessSatStartTimeId" {...register("BusinessSatStartTimeId")} disabled={checkbox5 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
							<div className="col-lg-1 col-2">
								<span className="stepto">To</span>
							</div>
							<div className="col-lg-4 col-5">
								<select className="stepselect" name="BusinessSatEndTimeId" {...register("BusinessSatEndTimeId")} disabled={checkbox5 ? false : true}>
                                {weeklydata && weeklydata.map((listitem)=>{
                                    return (<option id={listitem.Id} value={listitem.Id} key={listitem.Id}>{listitem.Hour}</option>)
                                })}
								</select>
							</div>
						</div>
					</div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Upload Profile</label>
                        <div className="input-filed">
                            <div className="regprofile-pic">
                            {uploadFile == "" ?
                            <img src="./images/no-image.png"  />
                            :
                            <img src={uploadFile}  />
                            }    
                                 <label>
                                 <input name="Image" {...register("Image")} type="file"  
                                 onChange={selectimage}
                                 /> 
                                 
                                 <span><i class="fas fa-upload"></i></span>    
                             </label> 
                            </div>
                                
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload Background</label>
                        <div className="input-filed">
                            <div className="regprofile-pic backgroud-image">
                            {uploadFile1 == "" ?
                            <img src="./images/no-image.png"  />
                            :
                            <img src={uploadFile1}  />
                            }    
                                 <label>
                                 <input name="Image1" type="file" {...register("Image1")} onChange={selectimage1}  /> 
                                 <span><i class="fas fa-upload"></i></span>    
                             </label> 
                            </div>
                                
                        </div>
                    </div>
                </div>
    </div>
    ) : null
}
{stepcount === 3 ?(
    
    <div className="row">
    <div className="col-md-6">
        <div className="form-group">
        <label>Business Area</label>
            <Multiselect 
            showArrow="true"
            placeholder="Select Area"
            options={Arealisted()}
            displayValue="label"
            onSelect={(event)=>{
                var _comValue = "";
               {event.map((item)=>{
                  var dataitem =  item.Id;
                  _comValue += dataitem + ',';
                  //console.log(_comValue)
                 setDataAreaList(_comValue)
               })}
             
            }}
            onRemove={(event)=>{}}
        />
        </div>
    </div>
    <div className="col-md-6">
        <div className="form-group">
        <label>Business Specialization</label>
            <Multiselect 
            showArrow="true"
            placeholder="Select Specialization"
            options={Specializationlisted()}
            displayValue="SpecializationsName"
            onSelect={(event)=>{
                var _comValue2 = "";
               {event.map((item)=>{
                  var dataitem =  item.Id;
                  _comValue2 += dataitem + ',';
                  //console.log(_comValue2)
                  setDataSpecializationList(_comValue2)
               })}
             
            }}
            onRemove={(event)=>{}}
        />
        </div>
    </div>
</div>
) : null
}
{stepcount === 4 ?(
    <div className="row">
    <div className="col-md-6">
        <div className="form-group">
        <label>Select Skill</label>
            <Multiselect 
            showArrow="true"
            placeholder="Select Skill"
            options={SkillListeddata()}
            displayValue="SkillName"
            onSelect={(event)=>{
                var _comValue3 = "";
               {event.map((item)=>{
                  var dataitem =  item.Id;
                  _comValue3 += dataitem + ',';
                  console.log(_comValue3)
                  setDataSkillList(_comValue3)
               })}
             
            }}
            onRemove={(event)=>{}}
        />
        </div>
    </div>
    <div className="col-md-6">
        <div className="form-group">
        <label>Select Industry</label>
            <Multiselect 
            showArrow="true"
            placeholder="Select Industry"
            options={industrylistdata()}
            displayValue="IndustryName"
            onSelect={(event)=>{
                var _comValue4 = "";
               {event.map((item)=>{
                  var dataitem =  item.Id;
                  _comValue4 += dataitem + ',';
                  console.log(_comValue4)
                  setDataindustryList(_comValue4)
               })}
             
            }}
            onRemove={(event)=>{}}
        />
        </div>
    </div>
</div>
) : null
}
<button type="button" className="backbutton" disabled={stepcount < 2} onClick={()=>setstepcount(stepcount - 1)}>Back</button>


{stepcount === 4 ?(
    <button type="submit" className="signupbtn">{loading ? "Loading..." : "Submit"} </button>
) : null
}

        {stepcount === 1 ?(
            <button type="button" className="signupbtn" disabled={!isValid} onClick={()=>setstepcount(stepcount + 1)}>Next</button>
        ) : null
        }
        {stepcount === 2 ?(
            <button type="button" className="signupbtn" disabled={!isValid} onClick={()=>setstepcount(stepcount + 1)}>Next</button>
        ) : null
        }
        {stepcount === 3 ?(
            <button type="button" className="signupbtn" disabled={!isValid} onClick={()=>setstepcount(stepcount + 1)}>Next</button>
        ) : null
        }
        {stepcount === 4 ?(
            <button type="submit" className="signupbtn hide" disabled={stepcount > 2} onClick={()=>setstepcount(stepcount + 1)}>Next</button>
        ) : null
        }
           
        </form>
    
        <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
       
        
         </div>
            
        </div> 
        
    )
}

export default Register


// <pre>{JSON.stringify(watch(), null, 2)}</pre>