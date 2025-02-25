import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GradientIcon from '@mui/icons-material/Gradient';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';

const PlayMenu = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  const [anchorElPlay, setAnchorElPlay] = useState(null);

  const handleClosePlay = () => {
    setAnchorElPlay(null);
  };

  const handleClickPlay = (event) => {
    setAnchorElPlay(event.currentTarget);
  };

  return (
    <>
      <Button
        id="Nav-play"
        sx={{ pl: 2, justifyContent: 'flex-start' }}
        variant={state.name === navConst.PLAY ? "contained" : "text"}
        startIcon={<GradientIcon />}
        onClick={handleClickPlay}
      >
        Play
      </Button>
      <Menu
        anchorEl={anchorElPlay}
        open={Boolean(anchorElPlay)}
        onClose={handleClosePlay}
      >
        <MenuItem
          id="Nav-play-MenuItem-online"
          onClick={() => {
            dispatch({ type: 'ws/online_games' });
            dispatch(playMode.playOnlineDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <LanguageIcon size="small" />&nbsp;Play Online
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-play-MenuItem-computer"
          onClick={() => {
            dispatch(stockfishMode.playComputerDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <SmartToyIcon size="small" />&nbsp;Play Computer
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-play-MenuItem-friend"
          onClick={() => {
            dispatch(playMode.set({ play: {} }));
            dispatch(playMode.createInviteCodeDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <PersonIcon size="small" />&nbsp;Play a Friend
        </MenuItem>
        <MenuItem
          id="Nav-play-MenuItem-enter-invite-code"
          onClick={() => {
            dispatch(playMode.enterInviteCodeDialog({ open: true }));
            handleClosePlay();
          }}
        >
          <KeyboardIcon size="small" />&nbsp;Enter Invite Code
        </MenuItem>
      </Menu>
    </>
  );
}

export default PlayMenu;
