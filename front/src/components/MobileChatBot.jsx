import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ChatArea, WssChatBotInfo } from "./ChatBotGeneral";
import { useTheme } from "@mui/material";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[200]
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: grey[200]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 6,
  backgroundColor:grey[500],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)"
}));


export default function MobileChatBot({ messages, createMessage, clearMessages }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(85% - ${drawerBleeding}px)`,
            overflow: "visible"
          }
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0
          }}
        >
          <Puller />
          <Typography sx={{
            p: 2,
            color: theme.palette.mode === "light" ? "secondary" : "white"
          }}>
            WSS ChatBot
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse"
          }}
        >

          <div>
            <WssChatBotInfo />
            <ChatArea messages={messages} clearMessages={clearMessages} createMessage={createMessage} />
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}


