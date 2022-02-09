import React,{useEffect, useState} from 'react';
import AfterLoginMenu from './AfterLoginMenu';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import {BaseUrl, removeUserSession, getToken, getId, refreshpage} from '../Common/Comon';
import Swal from 'sweetalert2';

const MyLeads = () => {
    const [DownloadUrl, setDownloadUrl] = useState();

    const [Data, setData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(4);
    const [Dmsg, setDmsg] = useState();
    const [MsgId, setMsgId] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const { register, handleSubmit, getValues, watch, formState: { errors, isValid } } = useForm({mode:"all"});

    var PageLimit = 4;
    const token = getToken();
    const Apiurl = BaseUrl();
    const ExpertId = getId();


    function openModal(id) {
      setIsOpen(true);
      setMsgId(id);
    }
  
    const onSubmit = (data) =>{
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Id": MsgId,
  "Reply": data.Message,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${Apiurl}/enquiry/enquiry-reponse`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    if(result.IsSuccess === true)
    {
      Swal.fire({
        title: 'Thanks for reply we are connect soon !',
        //text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          closeModal();
        }
      })
    }
    else
    {
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      })
    }
    
  })
  .catch(error => console.log('error', error));
    
    }

    function afterOpenModal() {
     
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background:'#0D4077',
        width:'550px'
      },
    };
    useEffect(()=>{
      document.title = 'My Leads';
    },[])
      useEffect(() => {

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`${Apiurl}/enquiry/get-expert-enquiry-list/${ExpertId}`, requestOptions)
          .then(response => response.json())        
          .then(result => {
              if(result.Content != null)
              {
                setData(result.Content);
                console.log(result);
              }
              else{
                setDmsg(result.Message);
              }
            
          })
          .catch(error => console.log('error', error));
    }, [])

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = Data.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderData = currentTodos.map((item, index) => {
        return <tr key={index} id={item.Id}>
        <td>{item.SlNo}</td>
        <td><span>{item.VisitorName}</span></td>
        <td><span>{item.Email} </span></td>
        <td><span>{item.Phone} </span></td>
        <td><div dangerouslySetInnerHTML={{__html: item.Message}} /></td>	
        <td><a download href={`${Apiurl}/file/download-file?q=${item.Attachment}`} >{item.Attachment}</a></td>
        <td><span>{item.EnquiryDateTime}</span></td>
        {item.IsAnswered === true ? <td className="text text-success">Replied</td> 	
      :
      <td><button type="button" className="btn-reply" onClick={()=>openModal(item.Id)}><i className="fas fa-reply"></i></button></td>
      }
        
    </tr>;
      });

      const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }


  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const ReplyMsg = () =>{

  }


 
 
    const renderPageNumbers = pageNumbers.map((number) => { 
        if(PageLimit === 4)
        {
            return (
                <li
                  key={number}
                  id={number}
                  onClick={handleClick}
                  className={currentPage == number ? "active" : null}
                >
                  {number}
                </li>
              ); 
        }
        
      
    });
 
  
   



    return (
        <div className="comon-page py-5">
        <div className="container">
            <div className="row">
                 <AfterLoginMenu/>
                <div className="col-md-9">
                <div className="afterlogin_right">
                <h2>My Leads </h2>
                {Dmsg ? <h4>{Dmsg}</h4>
                :
                <div className="table-responsive">
					<table className="tableafterprofile">
                        <tbody>
                        <tr>
                            <th>Sl.No</th>
							              <th>Visitor Name</th>
							              <th>Visitor Email</th>
                            <th>Visitor Phone</th>
                            <th>Message</th>
                            <th>Attachment</th>	
                            <th>Date</th>	
                            <th>Action</th>					
						            </tr>
                        {renderData}

                    </tbody>
                    
                    </table>
                        <ul className="pageNumbers">
                        {renderPageNumbers}
                        </ul>  
                </div>

                }
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2>Reply Message</h2>
                    <button className="close-btn" onClick={closeModal}><i className="fas fa-window-close"></i></button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                        <div className="col-md-12">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea {...register("Message",{required:true})} className="form-control" placeholder="Message Here"></textarea>

                                    {errors.Message && errors.Message.type === "required" && (<p className="errormsg">Field is required</p>)}

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                  </Modal>
                </div>
            </div>

           
        </div>
        
    </div>
    )
}

export default MyLeads
