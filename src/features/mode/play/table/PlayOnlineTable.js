import { useDispatch, useSelector } from 'react-redux';
import { Pgn } from '@chesslablab/reactblab';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  Avatar,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead
} from '@mui/material';
import wKing from 'assets/img/pieces/png/150/wKing.png';
import bKing from 'assets/img/pieces/png/150/bKing.png';
import * as playMode from 'features/mode/playModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';

const styles = {
  disabled: {
    cursor: 'default',
    '& td': {
      color: '#737373',
      backgroundColor: '#ececec',
    },
    '& img': {
      opacity: 0.5,
    },
  },
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const VariantIcon = ({ props }) => {
  if (props.variant === variantConst.CLASSICAL) {
    return <RestartAltIcon />;
  } else if (props.variant === variantConst.CHESS_960) {
    return <ShuffleIcon />;
  } else if (props.variant === variantConst.CAPABLANCA) {
    return <BlurOnIcon />;
  } else if (props.variant === variantConst.CAPABLANCA_FISCHER) {
    return <AllInclusiveIcon />;
  }

  return null;
}

const PlayOnlineTable = () => {
  const state = useSelector(state => state.playMode);
  const dispatch = useDispatch();

  const handlePlay = (hash) => {
    dispatch(nav.setPlay());
    dispatch({
      type: 'ws/accept',
      payload: hash,
    });
    dispatch(playMode.reset());
    dispatch(playMode.playOnlineDialog({ open: false }));
  };

  if (state.tables.playOnline.length > 0) {
    return (
      <TableContainer sx={{ mb: 3 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>Waiting for opponent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.tables.playOnline.map((row, i) => (
              <TableRow
                key={i}
                selected={true}
                sx={state.play?.hash === row.hash ? styles.disabled : styles.clickable}
                onClick={() => state.play?.hash === row.hash ? null : handlePlay(row.hash)}
              >
                <TableCell align="center">Guest</TableCell>
                <TableCell align="center">{row.min}</TableCell>
                <TableCell align="center">+{row.increment}</TableCell>
                <TableCell align="center">
                  {
                    row.color === Pgn.symbol.WHITE
                      ? <Avatar src={wKing} sx={{ mt: -0.85, width: 25, height: 25 }} />
                      : <Avatar src={bKing} sx={{ mt: -0.85, width: 25, height: 25 }} />
                  }
                </TableCell>
                <TableCell align="center">
                  <VariantIcon props={{ variant: row.variant }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
};

export default PlayOnlineTable;
