import React, { useState } from 'react';
import { Button, ButtonGroup, Menu, MenuItem } from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import TuneIcon from '@material-ui/icons/Tune';
import PublishIcon from '@material-ui/icons/Publish';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch, useSelector } from 'react-redux';
import boardActionTypes from '../constants/boardActionTypes';
import loadFenDialogActionTypes from '../constants/loadFenDialogActionTypes';
import loadPgnDialogActionTypes from '../constants/loadPgnDialogActionTypes';
import fenDialogActionTypes from '../constants/fenDialogActionTypes';
import createInviteCodeDialogActionTypes from '../constants/createInviteCodeDialogActionTypes';
import enterInviteCodeDialogActionTypes from '../constants/enterInviteCodeDialogActionTypes';
import alertActionTypes from '../constants/alertActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import pgnDialogActionTypes from '../constants/pgnDialogActionTypes';
import { DownloadImage } from './DownloadImage'
import { wsMssgHeuristicpicture, wsMssgStartAnalysis, wsMssgQuit, wsMssgFen } from '../actions/serverActions';

const Buttons = ({ props }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = React.useState(null);
  const [anchorElPlayWithTheComputer, setAnchorElPlayWithTheComputer] = React.useState(null);
  const [anchorElLoad, setAnchorElLoad] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
  };

  const handleClosePlayWithTheComputer = () => {
    setAnchorElPlayWithTheComputer(null);
  };

  const handleCloseLoad = () => {
    setAnchorElLoad(null);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const handleClickPlayFriend = (event) => {
    setAnchorElPlayFriend(event.currentTarget);
  };

  const handleClickPlayWithTheComputer = (event) => {
    setAnchorElPlayWithTheComputer(event.currentTarget);
  };

  const handleClickLoad = (event) => {
    setAnchorElLoad(event.currentTarget);
  };

  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleDownloadImage = () => DownloadImage();

  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="vertical contained button group"
      variant="text"
    >
      <Button
        startIcon={<GroupAddIcon />}
        onClick={handleClickPlayFriend}
        style={{ textTransform: 'none' }}
      >
        Invite a Friend
      </Button>
      <Menu
        anchorEl={anchorElPlayFriend}
        keepMounted
        open={Boolean(anchorElPlayFriend)}
        onClose={handleClosePlayFriend}
      >
        <MenuItem onClick={() => {
          dispatch({ type: createInviteCodeDialogActionTypes.OPEN });
          dispatch({ type: alertActionTypes.INFO_CLOSE });
          dispatch({ type: modeActionTypes.SET_ANALYSIS });
          handleClosePlayFriend();
        }}>Create Invite Code</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: enterInviteCodeDialogActionTypes.OPEN });
          handleClosePlayFriend();
        }}>Enter Invite Code</MenuItem>
      </Menu>
      <Button
        startIcon={<TuneIcon />}
        style={{ textTransform: 'none' }}
        onClick={() => wsMssgQuit(state).then(() => wsMssgStartAnalysis(state.server.ws))}
      >
        Analysis Board
      </Button>
      <Button
        startIcon={<ComputerIcon />}
        onClick={handleClickPlayWithTheComputer}
        style={{ textTransform: 'none' }}
      >
        Play With the Computer
      </Button>
      <Menu
        anchorEl={anchorElPlayWithTheComputer}
        keepMounted
        open={Boolean(anchorElPlayWithTheComputer)}
        onClose={handleClosePlayWithTheComputer}
      >
        <MenuItem onClick={() => {
          // TODO
        }}>Like a Grandmaster</MenuItem>
      </Menu>
      <Button
        startIcon={<PublishIcon />}
        onClick={handleClickLoad}
        style={{ textTransform: 'none' }}
      >
        Load
      </Button>
      <Menu
        anchorEl={anchorElLoad}
        keepMounted
        open={Boolean(anchorElLoad)}
        onClose={handleCloseLoad}
      >
        <MenuItem onClick={() => {
          dispatch({ type: loadFenDialogActionTypes.OPEN });
          handleCloseLoad();
        }}>FEN</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: loadPgnDialogActionTypes.OPEN });
          handleCloseLoad();
        }}>PGN</MenuItem>
      </Menu>
      <Button
        onClick={handleClickSettings}
        startIcon={<SettingsIcon />}
        style={{ textTransform: 'none' }}
      >
        Settings
      </Button>
      <Menu
        anchorEl={anchorElSettings}
        keepMounted
        open={Boolean(anchorElSettings)}
        onClose={handleCloseSettings}
      >
        <MenuItem
          key={0}
          onClick={() => {
            dispatch({ type: boardActionTypes.FLIP });
            handleCloseSettings();
          }}
        >
          Flip Board
        </MenuItem>
        <MenuItem
          key={1}
          onClick={() => {
            wsMssgHeuristicpicture(state).then(() => {
              handleCloseSettings();
            });
          }}
        >
          Heuristic Picture
        </MenuItem>
        <MenuItem
          key={2}
          onClick={() => {
            wsMssgFen(state).then(() => {
              dispatch({ type: fenDialogActionTypes.OPEN });
              handleCloseSettings();
            });
          }}
        >
          FEN
        </MenuItem>
        <MenuItem
          key={3}
          onClick={() => {
            // TODO
            dispatch({ type: pgnDialogActionTypes.OPEN });
            handleCloseSettings();
          }}
        >
          PGN Movetext
        </MenuItem>
        <MenuItem
          key={4}
          onClick={() => {
            handleDownloadImage().then(() => {
              handleCloseSettings();
            });
          }}
        >
          Image
        </MenuItem>
      </Menu>
    </ButtonGroup>
  );
}

export default Buttons;
