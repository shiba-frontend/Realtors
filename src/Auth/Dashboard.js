import React,{useState, useEffect} from 'react'
import { getUser, BaseUrl, getToken, getId } from '../Common/Comon';
import { useForm } from "react-hook-form";
import AfterLoginMenu from './AfterLoginMenu';
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const Dashboard = () => {
    const [AreaList, setAreaList] = useState([]);
    const [DataAreaList, setDataAreaList] = useState([]);
    const [SpecializationList, setSpecializationList] = useState([]);
    const [DataSpecializationList, setDataSpecializationList] = useState([]);
    const [SkillList, setSkillList] = useState([]);
    const [DataSkillList, setDataSkillList] = useState([]);
    const [industryList, setindustryList] = useState([]);
    const [DataindustryList, setDataindustryList] = useState([]);
    const [detailsdata, setdetailsdata] = useState([]);
    const [profileimage, setprofileimage] = useState();
    const [Coverimage, setCoverimage] = useState();
    const [selectedArea, setselectedArea] = useState([]);
    const [selectedSpecialization, setselectedSpecialization] = useState([]);
    const [selectedSkillList, setselectedSkillList] = useState([]);
    const [selectedIndustryList, setselectedIndustryList] = useState([]);
    const [Loading, setLoading] = useState(false)
    //const [postdata, setpostdata] = useState([]);
    const [weeklydata, setweeklydata] = useState();
    const [errorrepeatcheck, seterrorrepeatcheck] = useState(false);

    
    

    const user = getUser();
    const token = getToken();
    const userid = getId();
    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;
    


    const notify = () => {

        toast.warn("File Size too big  !", {
            position: toast.POSITION.TOP_CENTER,
          });
    };

    


    const HandleImage = (e) =>{

        var file = e.target.files[0];
        setprofileimage(file)
        var reader = new FileReader();
        //var url = reader.readAsDataURL(file);
        reader.onloadend = function(e) {
            const fsize = file.size;
            const fileSize = Math.round((fsize / 1024));
            if(fileSize >= 1000)
            {
                notify();
                
            }
            else
            {
                var editImg = document.getElementById('editImg');
                editImg.src = reader.result;
            }
           
            //setPreviewImage(e.target.result)
            //console.log(editImg)
          }
          reader.readAsDataURL(file); 

    }


    const HandleImage1 = (e) =>{

        var file = e.target.files[0];
        setCoverimage(file)
        var reader = new FileReader();
        //var url = reader.readAsDataURL(file);
        reader.onloadend = function(e) {
            const fsize = file.size;
            const fileSize = Math.round((fsize / 1024));
            if(fileSize >= 1000)
            {
                notify();
                
            }
            else
            {
                var editImg1 = document.getElementById('editCover');
                editImg1.src = reader.result;
            }
           
            //setPreviewImage(e.target.result)
            //console.log(editImg)
          }
          reader.readAsDataURL(file); 

    }
    useEffect(()=>{
		document.title = user;
	},[])
    //Own Data

    useEffect(() => {
        
        fetch(`${Apiurl}/expert/get-own-details/${userid}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
              console.log("own Data",responseJson);
            if(responseJson.Content != null){
                
                    setdetailsdata(responseJson.Content);
              }
          })
    }, [])
    
    const {ExpertId, Id, FirstName, LastName, Profilepicture, CoverPicture, DateOfBirth, Phone,
		Email, Description, MinPrice, MaxPrice, MondayStartTimeId, MondayStartTime, MondayEndTimeId,
		MondayEndTime, TuesdayStartTimeId, TuesdayStartTime, TuesdayEndTimeId, TuesdayEndTime, WednesdayStartTimeId, WednesdayStartTime, WednesdayEndTimeId, WednesdayEndTime, ThursdayStartTimeId, ThursdayStartTime, ThursdayEndTimeId, ThursdayEndTime, FridayStartTimeId,
		FridayStartTime, FridayEndTimeId, FridayEndTime, SaturdayStartTimeId, SaturdayStartTime, SaturdayEndTimeId, SaturdayEndTime, PinCode, BusinessName, BusinessAddress, Category,
		SubCategory, Website

    } = detailsdata;
    

    const { register, getValues, setValue, handleSubmit,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});


    
    const InputHandler = e =>{
        setdetailsdata({...detailsdata, [e.target.name]:e.target.value})
      }


    //Area
    useEffect(() => {
        fetch(`${Apiurl}/master/get-experts-areas-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
              if(responseJson.Content != null){
                setAreaList(responseJson.Content);
              }
            
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
    
    //Selected Value


    useEffect(() => {
        fetch(`${Apiurl}/expert/get-own-service-area-details?id=${userid}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        })
          .then(response => response.json())
          .then(result => {
            if(result.Content != null){
                setselectedArea(result.Content);
              }
          })
          .catch(error => console.log('error', error));
    }, [])

    const selectedAreaValue = () => {  
        return (selectedArea.map(data => ({
            Id:data.AreaId, 
            label: data.ServiceAreaName, 
            //value: data.Id 
        })
    ))  
    }

    const selectedAreaValueId = () => {  
        let dataSet1=[];
        selectedArea.map(data => (
            dataSet1.push(data.AreaId)
            )
    )
    return dataSet1;  
    }


    //Specialization

    useEffect(() => {
        
        fetch(`${Apiurl}/master/get-experts-specializations-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Content != null){
                setSpecializationList(responseJson.Content);
              }
          })

    }, [])

    const Specializationlisted = () => {  
        return (SpecializationList.filter(special => special.StatusId == 1).map(data => ({
            Id:data.Id, 
            SpecializationsName: data.SpecializationsName, 
            //value: data.Id 
        })
    ))  
    } 
    useEffect(() => {
        fetch(`${Apiurl}/expert/get-own-specialization-details?id=${userid}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        })
          .then(response => response.json())
          .then(result => {
            if(result.Content != null){
                setselectedSpecialization(result.Content)
                console.log(result.Content);
              }
          })
          .catch(error => console.log('error', error));
    }, [])

    const selectedSpecializationValue = () => {  
        return (selectedSpecialization.map(data => ({
            Id:data.SpecializationId, 
            SpecializationsName: data.SpecializationsName, 
            //value: data.Id 
        })
    ))  
    }
    // data.SpecializationId
    
    const selectedSpecializationValueId = () => {  
        let dataSet=[];
        selectedSpecialization.map(data => (
            dataSet.push(data.SpecializationId)
            )
    )
    return dataSet;  
    }

    //Skill
    useEffect(() => {
        
        fetch(`${Apiurl}/master/skill-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Content != null){
                setSkillList(responseJson.Content);
              }
          })

    }, [])

    const SkillListeddata = () => {  
        return (SkillList.filter(skill => skill.StatusId == 1).map(data => ({
            Id:data.Id, 
            SkillName: data.SkillName, 
            //value: data.Id 
        })
    ))  
    } 

    useEffect(() => {
        
        fetch(`${Apiurl}/expert/get-own-skill-details?id=${userid}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Content != null){
                setselectedSkillList(responseJson.Content);
              }
          })

    }, [])

    const SkillselectedListeddata = () => {  
        return (selectedSkillList.map(data => ({
            Id:data.SkillId, 
            SkillName: data.SkillName, 
            //value: data.Id 
        })
    ))  
    }
    const selectedSkillValueId = () => {  
        let dataSet2=[];
        selectedSkillList.map(data => (
            dataSet2.push(data.SkillId)
            )
    )
    return dataSet2;  
    }

    //Industry
    useEffect(() => {
        
        fetch(`${Apiurl}/master/get-industry-list?id=0`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Content != null){
                setindustryList(responseJson.Content);
              }
          })

    }, [])

    const industrylistdata = () => {  
        return (industryList.filter(industry => industry.StatusId == 1).map(data => ({
            Id:data.Id, 
            IndustryName: data.IndustryName, 
            //value: data.Id 
        })
    ))  
    } 


    useEffect(() => {
        
        fetch(`${Apiurl}/expert/get-own-industry-details?id=${userid}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.Content != null){
                setselectedIndustryList(responseJson.Content);
              }
          })

    }, [])

    const IndustryselectedListeddata = () => {  
        return (selectedIndustryList.map(data => ({
            Id:data.IndustryId, 
            IndustryName: data.IndustryName, 
            //value: data.Id 
        })
    ))  
    }

    const selectedIndustryValueId = () => {  
        let dataSet3=[];
        selectedIndustryList.map(data => (
            dataSet3.push(data.IndustryId)
            )
    )
    return dataSet3;  
    }

    //Business Hour

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

    const BusinesHoursList = () => {  
        return (weeklydata && weeklydata.map(listitem => ({
            Id:listitem.Id, 
            label: listitem.Hour, 
            value: listitem.Id 
        })
    ))  
    }
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
    }


    let PImage = "";
    let CImage = "";
    // var MaxValue = getValues("MaxPrice");
    // var MinValue = getValues("MinPrice");
   
    //console.log(MaxValue);

    const onSubmit = async (data) =>{

        // var MaxValueData = null;
        // var MinValueData = null;

        // if(MaxValue != null)
        // {
        //  MaxValueData.push = data.MaxPrice;
        // }
        // else
        // {
        //    MaxValueData.push = MaxPrice;
        // }

        // if(MinValue != null)
        // {
        //     MinValueData.push = data.MinPrice;
        // }
        // else
        // {
        //    MinValueData.push = MinPrice;
        // }
        

        setLoading(true);
       //return false;
       // profile Image
       
        var formdata = new FormData();
        formdata.append("Image", profileimage);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

       const res = await fetch(`${Apiurl}/file/upload-profile-image`, requestOptions)
        .then(res => res.json())
        .then(result => {
            PImage = result.Content;
        })
        .catch(error => console.log('error', error));



        //Cover Image

        var coverformdata = new FormData();
        coverformdata.append("Image", Coverimage);

        var requestOptions = {
        method: 'POST',
        body: coverformdata,
        redirect: 'follow'
        };

        const response1 = await fetch(`${Apiurl}/file/upload-cover-image`, requestOptions)
        .then(response1 => response1.json())
        .then(result => {
            CImage = result.Content;
        })
        .catch(error => console.log('error', error));



        //Account Data

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
        "Id":ExpertId,
        "FirstName": data.FirstName,
        "LastName": data.LastName,
        "Email": data.Email,
        "Phone": data.Phone,
        "ProfileImage":PImage,
        "CoverImage": CImage,
        "Pincode":data.PinCode,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log("Account Data raw", raw)
        const response2 = await  fetch(`${Apiurl}/expert/update-personal-details`, requestOptions)
        .then(response2 => response2.json())
        .then(result => {
            console.log("Account Data", result)
        })
    .catch(error => {
        console.log('error', error);
    });

    //Business Data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
        "Id": Id,
        "ExpertId": userid,
        "BusinessName": data.BusinessName,
        "BusinessDescription": data.Description,
        "BusinessAddress": data.BusinessAddress,
        "BusinessPostcode":data.PinCode,
        "BusinessWebsite": data.Website,
        "BusinessCategory": data.Category,
        "BusinessSubCategory": data.SubCategory,
        "BusinessMinPrice":data.MinPrice,
        "BusinessMaxPrice": data.MaxPrice,

    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    console.log("business raw", raw)
    const response3 = await  fetch(`${Apiurl}/expert/update-business-details`, requestOptions)
    .then(response3 => response3.json())
    .then(result => {
        console.log("Business Data", result)
    })
    .catch(error => {
        console.log('error', error);
    });


    //Area & Specialization Data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
     let  newDataSpecializationList = (DataSpecializationList != '')?DataSpecializationList:selectedSpecializationValueId().join();

     let  newDataAreaList = (DataAreaList != '') ? 
     DataAreaList:selectedAreaValueId().join();
     
    var raw = JSON.stringify({
        "ExpertId": userid,
        "AreaServedIds": String(newDataAreaList),
        "SpecializationsIds": String(newDataSpecializationList)
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    const response4 = await  fetch(`${Apiurl}/expert/update-business-service-details`, requestOptions)
    .then(response4 => response4.json())
    .then(result => {
        console.log("Area & Specialization", result)

    })
    .catch(error => {
        console.log('error', error);
    });


     //Skill  Data

     var myHeaders = new Headers();
     myHeaders.append("Authorization", `Bearer ${token}`);

     let  newDataSkillList = (DataSkillList != '') ? 
     DataSkillList:selectedSkillValueId().join();

     console.log("submit skill", newDataSkillList)

     var raw = JSON.stringify({
         "ExpertId": userid,
         "SkillIds": String(newDataSkillList),
     });
 
     var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
     };
     const response5 = await  fetch(`${Apiurl}/expert/update-skill-details`, requestOptions)
     .then(response5 => response5.json())
     .then(result => {
        console.log("Skill data", result)
 
     })
     .catch(error => {
         console.log('error', error);
     });


      //update-industry-details  Data

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
 
      let  newDataIndustryList = (DataindustryList != '') ? 
      DataindustryList:selectedIndustryValueId().join();
 
 
      var raw = JSON.stringify({
          "ExpertId": userid,
          "IndustryIds": String(newDataIndustryList),
      });
  
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };
      const response6 = await  fetch(`${Apiurl}/expert/update-industry-details`, requestOptions)
      .then(response6 => response6.json())
      .then(result => {
         console.log("Industry data", result)
          if(result.IsSuccess === true)
          {
            setLoading(false);
              Swal.fire({
                  title: 'Your profile update has been Successfully done !',
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                }).then((result) => {
                  if (result.isConfirmed) {
                  }
                })
          }
          else if(result.IsSuccess === false)
          {
            setLoading(false);
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
          }
  
      })
      .catch(error => {
          console.log('error', error);
      });



    }
   

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    //console.log("Outside",DataSpecializationList);
  //console.log("industry onchange", selectedIndustryValueId())
    return (
        <div className="comon-page py-5">
            <div className="container">
                <div className="row">
                     <AfterLoginMenu/>
                    <div className="col-md-9">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="cover-photo">

                            {(CImage != "") ?
                            <img src={`${imgApi}${CImage}`} className="one" id="editCover" accept="image/gif, image/jpeg, image/png" />
                        :
                        <img src={`${imgApi}${CoverPicture}`} className="two" id="editCover" accept="image/gif, image/jpeg, image/png" alt={FirstName}/>
                        }
                            <div className="edit-cover">
                                <input type="file" id="coverUpload" onChange={HandleImage1} />
                                <label htmlFor="coverUpload"><i className="far fa-edit"></i></label>
                            </div>
                        </div>

                        <div className="afterlogin_right">
                        <div className="edit-profile">
                        <h2>Edit Profile <small>(Welcome! {user})</small></h2>
                        
                        <div className="avatar-upload">
                                
                                <div className="avatar-preview">
                                    
                                    {(PImage != "") ?
                                     <img src={`${imgApi}${PImage}`} className="one" id="editImg" accept="image/gif, image/jpeg, image/png" />
                                    :
                                    <img src={`${imgApi}${Profilepicture}`} className="two" id="editImg" accept="image/gif, image/jpeg, image/png" alt={FirstName}/>
                                    }

                                    <div className="avatar-edit">
                                    <input type="file" name="Profilepicture" id="imageUpload" onChange={HandleImage} />
                                    <label htmlFor="imageUpload"><i className="far fa-edit"></i></label>
                                </div>
                                </div>				
                            </div>
                        <div className="manageprofile_panel">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>First Name</label>
                                            <input type="text"
                                            name="FirstName" 
                                            //value={FirstName || ''}
                                            //onChange={e => InputHandler(e)}
                                            defaultValue={FirstName}
                                            {...register("FirstName",{maxLength: 10,pattern: /[A-Za-z]/ })}
                                            className="form-control" 
                                            placeholder="First Name"
                                            />
                                            {errors.FirstName && errors.FirstName.type === "maxLength" && (<p className="errormsg">Maximam 10 words</p>)}
                                            {errors.FirstName && errors.FirstName.type === "pattern" && (<p className="errormsg">Not allowed numeric</p>)}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Last Name</label>

                                        <input type="text" name="LastName" defaultValue={LastName} {...register("LastName",{maxLength: 10})}  
                                        className="form-control" placeholder="Last Name" />
                                        {errors.LastName && errors.LastName.type === "maxLength" && (<p className="errormsg">Maximam 10 words</p>)}       
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="Email" defaultValue={Email} {...register("Email")} className="form-control" placeholder="Email"
                                        autoComplete="off"
                                        readOnly
                                        />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" maxLength="10" name="Phone" defaultValue={Phone} {...register("Phone",{pattern:/^[0-9\b]+$/,maxLength:10, minLength:10})} id="PhoneNo" className="form-control" placeholder="Phone Number"
                                        onBlur={(event) => onChangeHandler1(event)}
                                        />
                                        {errors.Phone && errors.Phone.type === "pattern" && (<p className="errormsg">Phone number is not valid</p>)}
                                        {errors.Phone && errors.Phone.type === "maxLength" && (<p className="errormsg">Maximam 10 Digit</p>)}
                                        {errors.Phone && errors.Phone.type === "minLength" && (<p className="errormsg">Minimum 10 Digit</p>)}
                                        {errorrepeatcheck ? <p className="errormsg">Phone number is not valid</p>:null}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Pin Code</label>

                                        <input type="text" maxLength="6" name="PinCode" defaultValue={PinCode} {...register("PinCode",{
                                            pattern:/^[0-9\b]+$/,maxLength:6
                                        })} className="form-control" placeholder="Post Code" />

                                        {
                                            errors.PinCode && errors.PinCode.type === "pattern" && (<p className="errormsg"> Post Code Should be Numeric </p>)
                                        }
                                        </div>
                                    </div>
                                    
                                </div>
                               
                                <h3>Business Info</h3>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Business Name</label>

                                        <input type="text" name="BusinessName" defaultValue={BusinessName} {...register("BusinessName")} className="form-control" placeholder="Business Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Business Address</label>
                                        <input type="text" name="BusinessAddress" defaultValue={BusinessAddress} {...register("BusinessAddress")} className="form-control" placeholder="Address" />

                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Website</label>
                                        <input type="text" name="Website" defaultValue={Website} {...register("Website")} className="form-control" placeholder="Business Website" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Category</label>
                                        <input type="text" name="Category" defaultValue={Category} {...register("Category")} className="form-control" placeholder="Category Service" />
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Sub Category</label>
                                        <input type="text" defaultValue={SubCategory} name="SubCategory" {...register("SubCategory")} className="form-control" placeholder="Sub-category" />
                                           
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Max Price</label>
                                        <input id="maxPrice" type="number" name="MaxPrice"  defaultValue={MaxPrice} {...register("MaxPrice",{pattern:/^[0-9\b]+$/})}  className="form-control" placeholder="Price Range Max" />

                                            {
                                                errors.MaxPrice && errors.MaxPrice.type === "pattern" && (<p className="errormsg"> Price range should be Numeric </p>)
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Min Price</label>
                                        <input id="MinPrice" type="number" name="MinPrice" defaultValue={MinPrice} {...register("MinPrice",{pattern:/^[0-9\b]+$/})} className="form-control" placeholder="Price Range Min" />

                                        {
                                            errors.MinPrice && errors.MinPrice.type === "pattern" && (<p className="errormsg"> Price range should be Numeric </p>)
                                        }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Business Area</label>
                                        <Multiselect 
                                        showArrow="true"
                                        placeholder="Select Area"
                                        options={Arealisted()}
                                        displayValue="label"
                                        selectedValues={selectedAreaValue()}
                                        onRemove={(event)=>{
                                            var _comValue = "";
                                            {event.map((item)=>{
                                                var dataitem =  item.Id;
                                                _comValue += dataitem + ',';
                                                setDataAreaList(_comValue)
                                            })}
                                        }}
                                        onSelect={(event)=>{
                                            var _comValue = "";
                                        {event.map((item)=>{
                                            var dataitem =  item.Id;
                                            _comValue += dataitem + ',';
                                            console.log("business Area",_comValue)
                                            setDataAreaList(_comValue)
                                        })}
                                        
                                        }}
                                    
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
                                        selectedValues={selectedSpecializationValue()}
                                        displayValue="SpecializationsName"
                                        onRemove={(event)=>{
                                            var _comValue2 = "";
                                            {event.map((item)=>{
                                                var dataitem =  item.Id;
                                                _comValue2 += dataitem + ',';
                                                console.log("remove", _comValue2)
                                                setDataSpecializationList(_comValue2)
                                            })}
                                        }}
                                        onSelect={(event)=>{
                                            var _comValue2 = "";
                                        {event.map((item)=>{
                                            var dataitem =  item.Id;
                                            _comValue2 += dataitem + ',';
                                            console.log("specialization", _comValue2)
                                            setDataSpecializationList(_comValue2)
                                        })}
                                        
                                        }}
                                       
                                    />
                                    </div>
                                </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                        <label>Business Description</label>

                                        <textarea className="form-control" defaultValue={Description} name="Description" {...register("Description")} rows="4" placeholder="Description of your business">
                                        </textarea>
                                            
                                        </div>
                                    </div>
                                </div>
                                <h3>Additional Info</h3>
                                <div className="row">
                                    
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Select Skill</label>
                                        <Multiselect 
                                        showArrow="true"
                                        placeholder="Select Skill"
                                        options={SkillListeddata()}
                                        selectedValues={SkillselectedListeddata()}
                                        displayValue="SkillName"
                                        onSelect={(event)=>{
                                            var _comValue3 = "";
                                        {event.map((item)=>{
                                            var dataitem =  item.Id;
                                            _comValue3 += dataitem + ',';
                                            console.log("Skill select", _comValue3)
                                            setDataSkillList(_comValue3)
                                        })}
                                        
                                        }}
                                        onRemove={(event)=>{
                                            var _comValue3 = "";
                                            {event.map((item)=>{
                                                var dataitem =  item.Id;
                                                _comValue3 += dataitem + ',';
                                                console.log("remove skill", _comValue3)
                                                setDataSkillList(_comValue3)
                                            })}
                                        }}
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
                                        selectedValues={IndustryselectedListeddata()}
                                        onSelect={(event)=>{
                                            var _comValue4 = "";
                                        {event.map((item)=>{
                                            var dataitem =  item.Id;
                                            _comValue4 += dataitem + ',';
                                            console.log("Set industry",_comValue4)
                                            setDataindustryList(_comValue4)
                                        })}
                                        
                                        }}
                                        onRemove={(event)=>{
                                            var _comValue4 = "";
                                            {event.map((item)=>{
                                                var dataitem =  item.Id;
                                                _comValue4 += dataitem + ',';
                                                console.log("set by remove",_comValue4)
                                                setDataindustryList(_comValue4)
                                            })}
                                        }}
                                    />
                                    </div>
                                </div>                       
                                </div>
                                

                                <input type="submit" className="signupbtn" value={Loading ? "Please Wait ..." : "Update"}/>
                            </div>
                           
                    </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
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
    )
}

export default Dashboard
