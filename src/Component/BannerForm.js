import React,{useState, useEffect} from 'react';
import {BaseUrl} from '../Common/Comon';
import {useHistory} from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown';
import Select, { components, PlaceholderProps } from 'react-select'


const BannerForm = () => {
    const [AreaList, setAreaList] = useState([]);
    const [SpecializationList, setSpecializationList] = useState([]);
    const [zipcode, setzipcode] = useState("");
    const [Name, setName] = useState("");
    const [Area, setArea] = useState("");
    
    const Apiurl = BaseUrl();
    
      

    
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

    const Arealisted = () => {  
        return (AreaList.filter(area => area.StatusId == 1).map(data => ({
            Id:data.Id, 
            label: data.ServiceAreaName, 
            name: data.ServiceAreaName,
            value:data.ServiceAreaName
        })
    ))  
    } 

    const Specializationlisted = () => {  
        return (SpecializationList.filter(special => special.StatusId == 1).map(data => ({
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
            <div className="col-md-4 col-mn">
                <div className="form-group">
                <input type="text" name="zipcode"  className="form-control" maxLength="6" minLength="6" placeholder="Zip Code"
                value={zipcode}
                onChange={e => setzipcode(e.target.value)}
                />
                </div>
            </div>
            <div className="col-md-4 col-mn">
                <div className="form-group">
                <Select
                isMulti
                name="Area"
                className="basic-multi-select"
                classNamePrefix="select Area"
                placeholder={'Select Area'}
                components={ 'Select Area' }
                options={Arealisted()}
                styles={customStyles}
              />
               
                </div>
            </div>
            <div className="col-md-4 col-mn">
                <div className="form-group">
                    <Select
                    isMulti
                    name="Specialization"
                    className="basic-multi-select"
                    classNamePrefix="select Specialization"
                    placeholder={'Select Specialization'}
                    components={ 'Select Specialization' }
                    options={Specializationlisted()}
                    styles={customStyles}
                />
                </div>
            </div>
            <div className="col-md-4 col-mn">
                <div className="form-group">
                <input type="text" name="Name" className="form-control" placeholder="Search by realtor Name"
                value={Name}
                onChange={e => setName(e.target.value)}
                />
                </div>
            </div>
            <div className="col-md-4 col-mn">
                <button type="submit" className="bannerformsubmit">Search</button>
            </div>
        </div>
    </form>
       
    )
}

export default BannerForm
