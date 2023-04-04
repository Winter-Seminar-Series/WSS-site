import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import {styled} from "@mui/material/styles";
import {ChatArea, WssChatBotInfo} from "./ChatBotGeneral";


const Root = styled('div')(({theme}) => ({
    height: '100%',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
}));

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
    height: '100%'
}));
export default function DesktopChatBot({messages, createMessage, clearMessages}) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Root>
            <Button onClick={toggleDrawer(true)}>
                push
            </Button>
            <SwipeableDrawer
                anchor='right'
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
                        <WssChatBotInfo/>
                        <ChatArea messages={messages} clearMessages={clearMessages} createMessage={createMessage}/>
                    </div>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}
