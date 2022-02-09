import React,{useState, useEffect} from 'react';
import {BaseUrl} from '../Common/Comon';
import {useHistory} from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select'

const FindRealtorForm = () => {
    const [AreaList, setAreaList] = useState([]);
    const [SpecializationList, setSpecializationList] = useState([]);
    const [zipcode, setzipcode] = useState("");
    const [Name, setName] = useState("");
    // const [Area, setArea] = useState("");
    
    const Apiurl = BaseUrl();
    const query = new URLSearchParams(window.location.search);
    var zipcodee  = query.get('zipcode');
    var arealist  = query.getAll('Area');
    var specializatinlist  = query.getAll('Specialization');
    var Rname  = query.get('Name');

    
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
            //console.log(responseJson.Content)
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

    const Arealisted = () => {  
        return (AreaList.map(data => ({
            Id:data.Id, 
            label: data.ServiceAreaName, 
            name: data.ServiceAreaName,
            value:data.ServiceAreaName
        })
    ))  
    } 

    const Specializationlisted = () => {  
        return (SpecializationList.map(data => ({
            Id:data.Id, 
            label: data.SpecializationsName,
            name: data.SpecializationsName, 
            value: data.SpecializationsName,
        })
    ))  
    } 
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px dotted pink',
          color: state.isSelected ? 'red' : 'blue',
        }),
        
        
      }

    return (
        
        <form  method="get" action="/find-realtor">
        <div className="row row-form">
            <div className="col-md-3 col-mn">
                <div className="form-group">
                <input type="text" name="zipcode"  className="form-control" maxLength="6" minLength="6" placeholder="Zip Code"
                value={zipcodee}
                onChange={e => setzipcode(e.target.value)}
                />
                </div>
            </div>
            <div className="col-md-3 col-mn">
                <div className="form-group">
                <Select
                isMulti
                name="Area"
                className="basic-multi-select"
                classNamePrefix="select Area"
                options={Arealisted()}
                styles={customStyles}
              />
               
                </div>
            </div>
            <div className="col-md-3 col-mn">
                <div className="form-group">
                    <Select
                    isMulti
                    name="Specialization"
                    className="basic-multi-select"
                    classNamePrefix="select specialization"
                    options={Specializationlisted()}
                    styles={customStyles}
                />
                </div>
            </div>
            <div className="col-md-3 col-mn">
                <div className="form-group">
                <input type="text" name="Name" className="form-control" placeholder="Search By Realtor"
                value={Name}
                onChange={e => setName(e.target.value)}
                />
                </div>
            </div>
            <div className="col-md-3 col-mn">
                <button type="submit" className="bannerformsubmit">Search</button>
            </div>
        </div>
    </form>
       
    )
}

export default FindRealtorForm
