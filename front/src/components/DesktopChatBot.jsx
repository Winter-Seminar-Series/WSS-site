import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ChatArea, WssChatBotInfo } from './ChatBotGeneral';
import ChatIcon from '@mui/icons-material/Chat';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[900],
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[900],
  height: '100%',
}));

const buttonStyle = {
  backgroundColor: '#000000',
  color: '#ffffff',
  height: '60px',
  borderRadius: '10px',
  //   on hover set the background color to a lighter shade of black
  '&:hover': {
    backgroundColor: '#363333',
  },
};
export default function DesktopChatBot({
  messages,
  createMessage,
  clearMessages,
}) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        <Button onClick={toggleDrawer(true)} sx={buttonStyle}>
          <ChatIcon fontSize={'large'} />
        </Button>
      </Box>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            width: '400px',
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <div>
            <WssChatBotInfo />
            <ChatArea
              messages={messages}
              clearMessages={clearMessages}
              createMessage={createMessage}
            />
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
