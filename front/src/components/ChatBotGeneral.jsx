import {Box, styled, useTheme, Typography, Divider} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Paper from "@mui/material/Paper";
import * as React from "react";
import {useRef, useState} from "react";

/*temp obj*/
const botAnswerSequence = [
    'سوال خوبیه ولی فکر کنم خیلی جواب دقیقی براش نداشته باشم',
    'خوشحال شدم از شنیدنش!',
    'من خوب هستم. حال شما چطوره؟',
    'سلام',

]

export const persianText = {
    fontFamily: 'IRANYekan',
    direction: 'rtl'
}


export const SendButton = ({createMessage, clearMessages}) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            createMessage(inputValue, true);
            setTimeout(() => {
                const popMessage = botAnswerSequence.pop();
                createMessage(popMessage, false);
            }, 2000);

            setInputValue('');
            inputRef.current.focus();
            event.preventDefault(); // prevent default form submit behavior
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginTop: '5px'}}>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
            >
                <InputBase
                    multiline
                    sx={{...persianText, ml: 1, flex: 1, textAlign: 'justify', direction: 'rtl'}}
                    placeholder="سوالت رو برام بنویس"
                    inputProps={{'aria-label': 'search google maps'}}
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    inputRef={inputRef}
                />
                <IconButton  sx={{p: '10px'}} aria-label="search" onClick={
                    () => {
                        createMessage(inputValue, true);
                        setTimeout(() => {
                            const popMessage = botAnswerSequence.pop();
                            createMessage(popMessage, false);
                        }, 2000);

                        setInputValue('');
                        inputRef.current.focus();
                    }
                }>
                    <SearchIcon sx={{color:'#06054b'}}/>
                </IconButton>
                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                <IconButton sx={{p: '10px'}} aria-label="directions" onClick={
                    () => {
                        clearMessages();
                    }
                }>
                    <ClearAllIcon sx={{color:'#06054b'}}/>
                </IconButton>
            </Paper>
        </Box>
    )
}


const UserMessageContainer = styled(Box)(({theme}) => ({
    display: 'inline-flex',
    textAlign: 'right',
    maxWidth: '75%',
    direction: 'ltr',
    borderRadius: '5px',
    margin: '0.6rem',
    padding: '0.6rem'
}))

const BotMessageContainer = styled(Box)(({theme}) => ({
    display: 'inline-flex',
    textAlign: 'right',
    maxWidth: '75%',
    direction: 'ltr',
    borderRadius: '5px',
    margin: '0.6rem',
    padding: '0.6rem'
}))


export const Message = ({isFromUser, messageContent}) => {
    const botBackgroundColor =  'white';
    const userBackgroundColor =  '#01003a';

    return (
        <div
            style={
                {
                    display: 'flex',
                    direction: isFromUser ? 'rtl' : 'ltr',
                }
            }
        >
            {isFromUser && (
                <UserMessageContainer
                    sx={{
                        ...persianText,
                        backgroundColor: userBackgroundColor,
                        color: 'white'
                    }}
                >
                    <Typography sx={persianText} variant='body1' component='p'>
                        {messageContent}
                    </Typography>
                </UserMessageContainer>
            )}
            {!isFromUser && (
                <BotMessageContainer
                    sx={{
                        backgroundColor: botBackgroundColor,
                        color: '#131313'
                    }}
                >
                    <Typography sx={persianText} variant='body1' component='p'>
                        {messageContent}
                    </Typography>
                </BotMessageContainer>
            )}
        </div>
    )
}

export const ChatArea = ({messages, createMessage, clearMessages}) => {
    return (
        <div>
            {
                messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            messageContent={message.content}
                            isFromUser={message.isFromUser}
                        />
                    )
                })
            }
            <SendButton
                createMessage={createMessage}
                clearMessages={clearMessages}
            />
        </div>
    )
}

export const WssChatBotInfo = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            height: '500px'
        }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <img
                    src='images/wss_logo_navy.svg'
                    alt='wss'
                    width='50%'
                    height='auto'
                    style={{
                        marginTop: '2rem',
                        marginBottom: '1rem'
                    }}
                />
            </div>

            <Typography className='IRANYekan' variant='h5' fontWeight='' align='center' gutterBottom
                        sx={{...persianText, marginBottom: '1rem'}}>
                به هشتمین WSS خوش‌آمدید
            </Typography>

            <Typography variant='body1' align='center' gutterBottom sx={persianText}>
                شما می‌توانید به کمک بات WSS از زمان ارائه‌ها، نحوه‌برگزاری و... مطلع شوید.
            </Typography>
        </Box>
    )
}