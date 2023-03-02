import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import QueryReply from './QueryReply';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

export default function QueryComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [dislikeCount, setDislikeCount] = React.useState(0);
  const [reply, setReply] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [count, setCount] = React.useState(5);
  const authData = useSelector((state) => state.auth.authData);



  const [data, setData] = React.useState(props.data.replies);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLike = () => {
    !like ? setLikeCount(likeCount+1) : setLikeCount(likeCount-1);
    setLike(!like);
    setDislike(false);
  };

  const handleDislike = () => {
    !dislike ? setDislikeCount(dislikeCount+1) : setDislikeCount(dislikeCount-1)
    setDislike(!dislike);
    setLike(false);
  };

  const handleReply = () => {
    let qu = {userIdentity:authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      reply_id: `${authData.email}-${count}`,
      reply: query,
      like:0,
      dislike:0
      };
    setData([...data,qu])
    props.setReply([...data,qu])
    setCount(count+1);
    document.getElementById('outlined-basic').value = '';
    setQuery('');
    setReply(false);
    setOpen(true);
  };

  const deleteQuery = (index) => {
    const updatedData = props.arr.filter((ele,ind) => {
        return ind !== index;
    })
    props.setReplies(updatedData);
  };


  return (
    <List
      sx={{ m:3, color:'black' }}
      component="nav"
    >
      <ListItemButton >
          <ListItemAvatar>
            <Avatar>M</Avatar>
          </ListItemAvatar>
        <ListItemText primary={`${props.data.firstName} ${props.data.lastName}`} secondary={props.data.query}/>
        <Button className='text-left' onClick={()=> setReply(true)}>Reply</Button>
        {like ? <>
                    <Badge sx={{mx:1}} badgeContent={likeCount} color="error">
                      <Button onClick={handleLike} variant="contained"><ThumbUpIcon/></Button>
                    </Badge>
                    <Badge sx={{mx:1}} badgeContent={dislikeCount} color="error">
                      <Button onClick={handleDislike} variant="outlined" color="error"><ThumbDownOffAltIcon /></Button>
                    </Badge>
                    <Button sx={{mx:1}} onClick={() => {deleteQuery(props.ind)}} variant="outlined" color="error"><DeleteIcon /></Button>
                </>: dislike ?
                <>
                    <Badge sx={{mx:1}} badgeContent={likeCount} color="error">
                      <Button onClick={handleLike} variant="outlined"><ThumbUpOffAltIcon/></Button>
                    </Badge>
                    <Badge sx={{mx:1}} badgeContent={dislikeCount} color="error">
                      <Button onClick={handleDislike} variant="contained" color="error"><ThumbDownIcon/></Button>
                    </Badge>
                    <Button sx={{mx:1}} onClick={() => {deleteQuery(props.ind)}} variant="outlined" color="error"><DeleteIcon /></Button>
                </>:
                <>
                    <Badge sx={{mx:1}} badgeContent={likeCount} color="error">
                      <Button onClick={handleLike} variant="outlined"><ThumbUpOffAltIcon/></Button>
                    </Badge>
                    <Badge sx={{mx:1}} badgeContent={dislikeCount} color="error">
                      <Button onClick={handleDislike} variant="outlined" color="error"><ThumbDownIcon/></Button>
                    </Badge>
                    <Button sx={{mx:1}} onClick={() => {deleteQuery(props.ind)}} variant="outlined" color="error"><DeleteIcon /></Button>
                </>
        }
        {open ? <ExpandLess sx={{m:3}} onClick={handleClick} fontSize='large' /> : <ExpandMore fontSize='large' sx={{m:3}} onClick={handleClick}/>}
      </ListItemButton>
      <Collapse in={reply} timeout="auto" unmountOnExit>
        <div sx={{px:10, my:5}} className='m-3 justify-content-center'>
            <TextField style={{width:'50%'}} id="outlined-basic" label="Reply to Query" variant="outlined" value={query} onChange={(e)=> setQuery(e.target.value)} />
            <Button sx={{mx:1}} variant="contained" onClick={handleReply}>Reply</Button>
            <Button variant="outlined" onClick={()=> {setReply(false);}}>Cancel</Button>
        </div>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider textAlign='left'><Chip label="Replies" /></Divider>
      {data.map((item,index,array) => <QueryReply setData={setData} ind={index} key={index} data={item} arr={array}/>)}
      </Collapse>
    </List>
  );
}
