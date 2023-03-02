import React, { cloneElement, useEffect, useState } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import './ViewIdeas.css';
import { getIdeas } from '../../Services/IdeasApi';
import '../../Components/Styling/ButtonsStyling.css';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRowsPerPage, openPostIdea, openViewIdea } from '../../Redux/Action-Creators/componentsActions';
import getIdeaObj from '../../Redux/Action-Creators/postIdeaObj';
import { editFieldsForAdmin } from '../../Services/IdeasApi';


const ViewIdeas = () => {
    const userInfo = useSelector(state => state?.auth?.authData);
    let valBool = false;
    let flexVal = 1;
    console.log(userInfo?.userType);
    if (userInfo?.userType?.toLowerCase() === "admin") {
        valBool = true;
        flexVal = 3;
    }
    const [ideas, setIdeas] = useState([]);
    const [ideas_, setIdeas_] = useState([]); // for searching.
    let perPageSize = -100; // Setting state for perPageSize throughout the application Visit. It will not change when user will not chnage. No matter where the user goes 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [txt_, setTxt_] = useState(""); //grid cell

    const getAllIdeas = async () => {
        let response = await getIdeas();
        let i = 1;
        setIdeas(response.data.map(obj => ({ ...obj, srNo: i++ })));
        setIdeas_(response.data.map(obj => ({ ...obj, srNo: i++ }))) // for searching.
    };

    useEffect(() => {
        const obj = {
            postedBy: 2,
            groupId: -100,
            status: 'Undefined',
            supervisor: 'N/A',
            coSupervisor: 'N/A',
            postedOn: Date.now(),
            updatedBy: -100,
            updatedOn: 1671314064511,
            Idea_Title: ''
        }

        getAllIdeas();
        dispatch(getIdeaObj(obj));
    }, []);


    const openPostIdeaPage = () => {
        dispatch(openPostIdea());
        navigate('/home/PostIdea');
    }


    const openViewIdeaPage = (rowId) => {
        let obj = ideas.find(row => row._id === rowId);
        dispatch(getIdeaObj(obj));
        dispatch(openViewIdea());
        navigate('/ViewIdeas/DetailView');
    }

    const editAdminFields = async (params) => {
        // let obj = ideas.find(row => row._id === params.row._id);
        let row = params.row;
        console.log(row);
        // obj.Supervisor
        // console.log("Admin", row);
        await editFieldsForAdmin(row);
    }

    const testBool = true;
    console.log(valBool);
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            // width: 90,
            flex: 0.5,
            hide: true
        },
        {
            field: 'srNo',
            headerName: 'Sr.No',
            // width: 90,
            flex: 0.5
        },
        {
            field: 'Idea_Title',
            headerName: 'Idea Title',
            // width: 200,
            flex: 1.5,
            editable: false,

        },
        {
            field: 'Description',
            headerName: 'Description',
            // width: 200,
            flex: 1.5,
            editable: false,
        },
        {
            field: 'Lock',
            headerName: 'Is Booked',
            type: 'boolean',
            // width: 100,
            flex: 0.8,
            editable: false
        },
        {
            field: 'Status',
            headerName: 'Status',
            // width: 100,
            flex: 0.8,
            editable: valBool,
        },
        {
            field: 'Supervisor',
            headerName: 'Supervisor',
            editable: valBool,
            // width: 150
            flex: 0.9,
        },
        {
            field: 'Co_Supervisor',
            headerName: 'Co Supervisor',
            editable: valBool,
            // width: 150
            flex: 1,
        },
        {
            field: 'Posted_On',
            headerName: 'Posted On',
            editable: false,
            // width: 150,
            flex: 1.3,
            renderCell: (params) =>
                moment(params.row.createdAt).format('MMMM DD, YYYY ')
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            // width: 164,
            flex: flexVal,
            renderCell: (params) => {
                // <PersonPinIcon {...{ params, rowId, setRowId }} />
                return (
                    <div style={{ display: 'flex' }}>
                        <Button
                            style={{
                                maxWidth: '105px',
                                maxHeight: '35px',
                                minWidth: '105px',
                                minHeight: '35px',
                                textTransform: "none"
                            }}
                            variant="contained"
                            onClick={() => openViewIdeaPage(params.row._id)}
                        >
                            {/* {params.row._id} */}
                            View Detail
                        </Button>

                        <Button
                            style={valBool === true ? {
                                display: 'block', marginLeft: '10px',
                                maxWidth: '105px',
                                maxHeight: '35px',
                                minWidth: '105px',
                                minHeight: '35px',
                                textTransform: "none",
                            } : { display: 'none' }}
                            variant="contained"
                            onClick={() => editAdminFields(params)}
                        >
                            {/* {params.row._id} */}
                            Edit
                        </Button>
                    </div>
                )
            }
        },
    ];

    perPageSize = useSelector(state => state.datagridRowsPerPage);

    // Searching field function.
    const requestSearch = (searchedVal) => {
        let skw = ""
        skw = skw + searchedVal
        if (searchedVal === "") {
            getAllIdeas()
        }

        if (skw.trim() !== "") {
            const filteredRows = ideas_.filter((row) => {
                return String(row.Idea_Title).toLowerCase().includes(String(skw).toLowerCase());
            });
            if (skw === "") {
                getAllIdeas()
            }
            else {
                setIdeas(filteredRows);
            }
        }

    };

    // const testFunc = () => {
    //     alert('Hello');
    // }

    return (
        <div className="content">
            <div className="title">
                <img src="" alt="" />
                <label id="label">Final Year Project Ideas</label>
            </div>

            <div className="searchFields">

                <div className='searchInputDiv'>
                    <input type={'text'}
                        placeholder={'Search'}
                        id='searchInput'
                        onChange={(e) => { requestSearch(e.target.value); }}
                    />
                </div>

                {/* <button className='btn'>Post Idea</button> */}
                <Button
                    // style={{
                    //     maxWidth: '90px',
                    //     maxHeight: '35px',
                    //     minWidth: '90px',
                    //     minHeight: '35px',
                    //     textTransform: "none",
                    //     padding: '10px 13px',

                    // }}
                    style={userInfo?.user_type?.toLowerCase() === 'admin' ? {
                        display: 'none'
                    } : {
                        maxWidth: '90px',
                        maxHeight: '35px',
                        minWidth: '90px',
                        minHeight: '35px',
                        textTransform: "none",
                        padding: '10px 13px',
                        display: 'flex'
                    }}
                    variant="contained"
                    onClick={openPostIdeaPage}
                >
                    Add Idea
                </Button>
            </div>

            <DataGrid
                columns={columns}
                rows={ideas}
                getRowId={(row) => row.srNo}
                rowsPerPageOptions={[6, 10, 20, 30]}
                pageSize={perPageSize}
                checkboxSelection={true}
                disableSelectionOnClick
                headerHeight={50}
                disableColumnMenu
                // onCellEditCommit={testFunc()}
                onPageSizeChange={(newPageSize) => { dispatch(getRowsPerPage(newPageSize)) }}
                // onCellEditStop={(params, event) => {
                //     if (params.value != "") {
                //         console.log(params.value)
                //         setTxt_(params.)
                //         console.log(params.value)
                //     }

                // }}
                // onCellClick={(params) => testClickCall(params)}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    height: '480px', margin: '20px',
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'light' ? grey[200] : grey[900],
                    }, '& .MuiDataGrid-iconButtonContainer': {
                        color: 'green'
                    }, '& .MuiDataGrid-sortIcon': {
                        color: 'white'
                    }, '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#343434',
                        color: 'white'
                    },
                    '& .MuiCheckbox-root.Mui-checked': {
                        color: '#1976d2'
                    },
                    '& .MuiCheckbox-root': {
                        color: 'white'
                    },
                    '& .MuiDataGrid-row .MuiCheckbox-root': {
                        color: 'black'
                    },
                    '& .MuiDataGrid-row .MuiCheckbox-root.Mui-checked': {
                        color: '#1976d2'
                    }
                }}
            />
        </div>
    )
}

export default ViewIdeas;
