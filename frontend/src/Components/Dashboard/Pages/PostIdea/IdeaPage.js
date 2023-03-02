import React, { useState } from 'react';
// import "./IdeasPage.css";
import './IdeasPage.css';
import { addIdea } from '../../Services/IdeasApi.js';
import '../../Components/Styling/ButtonsStyling.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { display } from '@mui/system';
// import { display } from '@mui/system';
// import { test } from './ViewIdeas';

const PostIdea = () => {
    const userInfo = useSelector(state => state.user);
    const ideaObj = useSelector(state => state.ideaObject);
    const [user, setUser] = useState({});
    let isOpened = useSelector(state => state.isIdeaPageOpened);
    console.log(isOpened);
    const navigate = useNavigate();

    const [text, setText] = useState('')
    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        setText({ ...user, [e.target.name]: e.target.value })
    }


    const SubmitIdea = async (e) => {
        if (userInfo.user_type.toLowerCase() === "student") {
            user.lock = false;
        }
        else if (userInfo.user_type.toLowerCase() === "teacher") {
            user.lock = true;
        }
        e.preventDefault();
        user.postedBy = 2;
        user.groupId = -100;
        user.status = 'Undefined';
        user.supervisor = 'N/A';
        user.coSupervisor = 'N/A';
        user.postedOn = Date.now();
        user.updatedBy = -100;
        user.updatedOn = 1671314064511;
        await addIdea(user);
        navigate('/ViewIdeas');
    }


    return (
        <div className="backContainer">
            <div className="titleLabel">
                <img src="" alt="" />
                <label id="label">Post Final Year Project Idea</label>
            </div>

            <form onSubmit={SubmitIdea}>
                <div className='allComponentsContainer' >
                    <div className='rowFieldsContainer' style={isOpened === false ? { display: 'flex' } : { display: 'none' }}>
                        <div className='leftSideComponents'>
                            <div className='leftLabelsDiv'>
                                <label htmlFor="" className='leftLabelsClass' id='submittedByLabel'>Submitted By: </label>
                                <label htmlFor="" className='leftLabelsClass' id='statusLabel'>Status: </label>
                                <label htmlFor="" className='leftLabelsClass' id='assignedGroupLabel'>Assigned Group: </label>
                                <label htmlFor="" className='leftLabelsClass' id='personRoleLabel'>Person Role: </label>
                            </div>

                            <div className='leftInputsDiv'>
                                <input disabled type='text' className='leftInputsClass' id='submittedByTextbox' name="submittedByInput" value={isOpened === true ? '' : ideaObj.Posted_By} />
                                <input disabled type='text' className='leftInputsClass' id='statusLabelTextbox' name="statusLabelInput" value={isOpened === true ? '' : ideaObj.status} />
                                <input disabled type='text' className='leftInputsClass' id='assignedGroupTextbox' name="assignedGroupInput"
                                />
                                <input disabled type='text' className='leftInputsClass' id='personRoleTextbox' name="personRoleInput" value={userInfo.user_type} />
                            </div>
                        </div>

                        <div className='rightSideComponents'>
                            <div className='rightLabelsDiv'>
                                <label htmlFor="" className='rightLabelsClass' id=''>Submitted Date: </label>
                                <label htmlFor="" className='rightLabelsClass' id=''>Status Changed: </label>
                                <label htmlFor="" className='rightLabelsClass' id=''>Updated Date: </label>
                            </div>

                            <div className='rightInputsDiv'>
                                <input disabled type='text' className='rightInputsClass' id='' name="" value={isOpened === true ? '' : ideaObj.Posted_On} />
                                <input disabled type='text' className='rightInputsClass' id='' name="" value={isOpened === true ? '' : ideaObj.Updated_On} />
                                <input disabled type='text' className='rightInputsClass' id='' name="" value={isOpened === true ? '' : ideaObj.Updated_On} />
                            </div>
                        </div>
                    </div>

                    <div className='bottomSideComponents'>
                        <div className='bottomLabelsDiv'>
                            <label htmlFor="" className='bottomLabelsClass' id=''>Idea Title: </label>
                            <label htmlFor="" className='bottomLabelsClass' id=''>Description: </label>
                        </div>

                        <div className='bottomInputsDiv'>
                            {/* {isOpened === true ? <input type='text' className='bottomInputsClass' id='titleTextbo' name="title" onChange={(e) => onValueChange(e)}
                            /> : null} */}

                            <input type='text' className='bottomInputsClass' id='titleTextbox' name="title" onChange={(e) => onValueChange(e)}
                                style={isOpened === true ? { display: 'block' } : { display: 'none' }}
                            />

                            <input disabled type='text' className='bottomInputsClass' id='titleTextboxOnView' name="title" value={ideaObj.Idea_Title} onChange={(e) => onValueChange(e)}
                                style={isOpened === true ? { display: 'none' } : { display: 'block' }}
                            />







                            <textarea id='descTextarea' className='bottomInputsClass' name="desc"
                                style={isOpened === true ? { display: 'block' } : { display: 'none' }} onChange={(e) => onValueChange(e)}></textarea>

                            <textarea disabled id='descTextarea' value={ideaObj.Description} className='bottomInputsClass' name="desc"
                                style={isOpened === true ? { display: 'none' } : { display: 'block' }} onChange={(e) => onValueChange(e)}></textarea>


                        </div>
                    </div>

                    <div className="buttonsFieldComponents" style={isOpened === true ? { marginTop: '180px' } : { marginTop: '0px' }} >
                        <div className='leftSideButtons'>
                            <button id='backButton' className='btn' onClick={() => { navigate('/ViewIdeas') }}>Back</button>

                            <button id='deleteButton' className='btn' type='submit'
                                style={isOpened === false ? { display: 'block' } : { display: 'none' }}>Delete</button>
                        </div>

                        <div className='rightSideButtons'>
                            <button id='editButton' style={isOpened === false ? { display: 'block' } : { display: 'none' }} className='btn'>Edit</button>

                            <button id='postButton' style={isOpened === false ? { display: 'none' } : { display: 'block' }} className='btn' type='submit'>Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostIdea;
