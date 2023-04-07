import { Box, CircularProgress, Divider, styled, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import axios from "axios";

/*temp obj*/


export const persianText = {
  fontFamily: "IRANYekan",
  direction: "rtl"
};

const serverUrl = "https://wss.ce.sharif.edu/FAQ/Ask";

const postMessageToServer = async (inputValue) => {
  const response = await axios.post(serverUrl, { question: inputValue });
  return response.data;
};


const botResponseChainFilter = (message) => {
  const chain = [hardCodeHandler, replaceLinkWithAnchor];
  return chain.reduce((acc, handler) => handler(acc), message);
};

const hardCodeHandler = (message) => {
  // if message contains hello
  if (message.includes("دا!")) {
    return "ببخشید که نتونستم اونجوری که میخواستید پاسخگو باشم. من هنوز در حال توسعه هستم. این باگ رو میتونید به پشتیبانی گزارش کنید";
  }
  return message;
};

const replaceLinkWithAnchor = (text) => {
  const regex = /(https?:\/\/\S+)/g;
  return text.replace(regex, (url) => {
    return `<a href="${url}" target="_blank">این لینک</a>`;
  });
};

export const SendButton = ({ createMessage, clearMessages }) => {
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const inputRef = useRef(null);

  const addQuestionAndAnswer = async () => {
    createMessage(inputValue, true);
    setIsWaiting(true);
    try {
      const responseMessage = await postMessageToServer(inputValue);
      createMessage(botResponseChainFilter(responseMessage), false);
    } catch (error) {
      createMessage("متاسفانه در ارتباط با سرور مشکلی پیش آمده است", false);
    }

    setInputValue("");
    setIsWaiting(false);
    inputRef.current.focus();
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await addQuestionAndAnswer();
      event.preventDefault(); // prevent default form submit behavior
    }
  };


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginTop: "5px" }}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          multiline
          sx={{ ...persianText, ml: 1, flex: 1, textAlign: "justify", direction: "rtl" }}
          placeholder={!isWaiting ? "سوالت رو برام بنویس" : "در حال جواب دادن به سوالت"}
          inputProps={{ "aria-label": "search google maps" }}
          value={!isWaiting ? inputValue : ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search" onClick={
          async () => {
            await addQuestionAndAnswer();
          }
        }>
          {isWaiting ? (
            <CircularProgress size={20} />
          ) : (
            <SearchIcon sx={{ color: "#06054b" }} />
          )}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: "10px" }} aria-label="directions" onClick={
          () => {
            clearMessages();
          }
        }>
          <DeleteSweepIcon sx={{ color: "#06054b" }} />
        </IconButton>
      </Paper>
    </Box>
  );
};


const UserMessageContainer = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  textAlign: "right",
  maxWidth: "75%",
  direction: "ltr",
  borderRadius: "5px",
  margin: "0.6rem",
  padding: "0.6rem"
}));

const BotMessageContainer = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  textAlign: "right",
  maxWidth: "75%",
  direction: "ltr",
  borderRadius: "5px",
  margin: "0.6rem",
  padding: "0.6rem"
}));


export const Message = ({ isFromUser, messageContent }) => {
  const botBackgroundColor = "white";
  const userBackgroundColor = "#01003a";

  return (
    <div
      style={
        {
          display: "flex",
          direction: isFromUser ? "rtl" : "ltr"
        }
      }
    >
      {isFromUser && (
        <UserMessageContainer
          sx={{
            ...persianText,
            backgroundColor: userBackgroundColor,
            color: "white"
          }}
        >
          <Typography sx={persianText} variant="body1" component="p">
            {messageContent}
          </Typography>
        </UserMessageContainer>
      )}
      {!isFromUser && (
        <BotMessageContainer
          sx={{
            backgroundColor: botBackgroundColor,
            color: "#131313"
          }}
        >
          <Typography sx={persianText} variant="body1" component="p">
            <span dangerouslySetInnerHTML={{ __html: messageContent }} />
          </Typography>

        </BotMessageContainer>
      )}
    </div>
  );
};

export const ChatArea = ({ messages, createMessage, clearMessages }) => {
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setIsClearing(true);
      setTimeout(() => setIsClearing(false), 500);
      // wait 500ms for the fade-out animation to complete
    }
  }, [messages]);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -10 }
  };

  return (
    <div>
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "10px" }}
          >
            <Message
              messageContent={message.content}
              isFromUser={message.isFromUser}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <SendButton createMessage={createMessage} clearMessages={clearMessages} />

    </div>
  );
};

export const WssChatBotInfo = () => {
  useTheme();
  return (
    <Box sx={{
      height: "500px"
    }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <img
          src="images/wss_logo_navy.svg"
          alt="wss"
          width="50%"
          height="auto"
          style={{
            marginTop: "2rem",
            marginBottom: "1rem"
          }}
        />
      </div>

      <Typography className="IRANYekan" variant="h5" fontWeight="" align="center" gutterBottom
                  sx={{ ...persianText, marginBottom: "1rem" }}>
        به هشتمین WSS خوش‌ آمدید
      </Typography>

      <Typography variant="body1" align="center" gutterBottom sx={persianText}>
        شما می‌توانید به کمک بات WSS از زمان ارائه‌ها، نحوه‌ برگزاری و... مطلع شوید.
      </Typography>
    </Box>
  );
};