import * as React from 'react';
import QueryComponent from './QueryComponent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getQueries, postQueries } from '../../Services/IdeasApi';
import { useEffect } from 'react';
import { useSelector } from "react-redux";


export default function Queries() {

  const [queries, setQueries] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [count, setCount] = React.useState(5);
  const [replies, setReplies] = React.useState([]);
  const authData = useSelector((state) => state.auth.authData);

  const getAllQueries = async () => {
    let response = await getQueries();
    let i = 1;
    setQueries(response.data.map(obj => ({ ...obj, srNo: i++ })));

    };

  useEffect(() => {
    getAllQueries();
  }, []);

  const handleAsk = async () => {
    let qu = {userIdentity:authData.email,
                  firstName: authData.firstName,
                  lastName: authData.lastName,
                  query_id: `${authData.email}-${count}`,
                  query: query,
                  replies:replies,
                  likes:0,
                  dislikes:0
              };
    setQueries([...queries,qu])
    let response = await postQueries(qu);
    setCount(count+1);
    console.log(response)
  };

  return (
    <div style={{marginTop: '1rem'}}>
    <div className='my-5'  style={{ height:'fit-content',width: '95%', backgroundColor:'rgb(255, 255, 255)', marginLeft:'25px',  boxShadow:' 10px 10px 8px #0047AB', borderRadius:'15px'}}>
    <Typography variant="h3" component="div" sx={{mx:3}}>
              Queries
    </Typography>
    <hr style={{border:'2px solid #000000'}}/>
    <div  className='mx-3 justify-content-center' style={{margin:'1rem'}}>
      <TextField style={{width:'80%', height:'5px'}} id="outlined-basic" label="Ask a Query..." variant="outlined" onChange={(e)=> setQuery(e.target.value)}/>
      <Button sx={{mx:2}} variant="contained" size="large" onClick={handleAsk}>Ask</Button>
    </div>
    {queries.map((item,index,array) => <QueryComponent setReply={setReplies} ind={index} key={index} data={item} arr={array}/>)}
    </div>
    </div>
  );
}
