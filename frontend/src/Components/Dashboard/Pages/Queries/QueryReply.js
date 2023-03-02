import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';

export default function QueryReply(props) {
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [dislikeCount, setDislikeCount] = React.useState(0);

  console.log(props.data)

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

  const deleteQuery = (index) => {
    const updatedData = props.arr.filter((ele,ind) => {
        return ind !== index;
    })
    props.setData(updatedData);
  };

  return (
        <List >
          <ListItemButton sx={{ px: 15 }}>
            <ListItemAvatar>
              <Avatar>
                {props.data.firstName[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.data.firstName} ${props.data.lastName}`} secondary={props.data.reply}/>
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
          </ListItemButton>
        </List>
  );
}
