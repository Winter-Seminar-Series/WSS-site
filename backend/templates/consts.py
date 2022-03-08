PAYMENT_SUBJECT = 'WSS payment confirmation'
RESET_PASSWORD_SUBJECT = 'WSS reset password'

RAW_BASE_HTML = '''<!DOCTYPE html>
<html>
    <head>
        <meta name="ROBOTS" content="NOINDEX, NOFOLLOW">
        <meta name="referrer" content="no-referrer">
    <title>7th WSS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <style>
      #outlook a {{ padding: 0; }}
      /* Force Outlook to provide a "view in browser" menu link. */
  
      body {{
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }}
      /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
  
      .ExternalClass {{
        width: 100%;
      }}
      /* Force Hotmail to display emails at full width */
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {{
        line-height: 100%;
      }}
      /* Force Hotmail to display normal line spacing.*/
  
      img {{
        outline: none;
        text-decoration: none;
        border: none;
        -ms-interpolation-mode: bicubic;
      }}
  
      a img {{
        border: none;
      }}

      .text-center {{
          text-align: center;
      }}

      .px-1 {{
          padding-left: 2rem;
          padding-right: 2rem;
      }}

      .py-1 {{
          padding-top: 2rem;
          padding-bottom: 2rem;
      }}

      .px-2 {{
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }}

      .py-2 {{
        padding-top: 0.75rem;
          padding-bottom: 0.75rem;
      }}

      .p-relative {{
          position: relative;
      }}

      #site::after, #logo::after {{
          content: '';
          width: 30px;
          height: 4px;
          background-color: #0f0f6e;
          position: absolute;
          left: 50%;
          margin-left: -10px;
          border-radius: 4rem;
      }}
      #site::after {{
        top: -15px;
      }}
      #logo::after {{
          bottom: 10px;
      }}
    </style>
  </head>
  
  <body>
      <div>
          <div>
              <div id="logo" class="text-center p-relative px-1 py-1">
                <a href="http://wss.ce.sharif.edu" target="_blank" style="text-decoration: none;"><img src="https://wss.ce.sharif.edu/media/7th/logos/banner1.png" style="width: 100%" border="0" alt="WSS 7th Series"></a>
              </div>
          </div>
          {}
          <footer>
            <div class="text-center px-1 py-1">
                <div class="py-2 p-relative" id="site">
                    <a href="http://wss.ce.sharif.edu" target="_blank" style="text-decoration: none;"><img src="https://s17.picofile.com/file/8414284650/wss_ce_sharif_edu.png" border="0" width="137.6" height="13.6" alt="wss.ce.sharif.edu"></a>
                </div>
                <div class="py-2">
                <a href="https://t.me/wss_sut" target="_blank" class="px-2" style="text-decoration: none;"><img src="https://wss.ce.sharif.edu/media/7th/logos/Telegram.png" border="0" width="26" height="25" style="width: 26px; height: 25px; max-width: 26px;border:none; outline:none; text-decoration:none;font-size:19px;font-family:URWGeometric,Helvetica Neue, Arial, sans-serif;color:#00aced;font-weight:bold" alt="   te"></a>
                <a href="https://instagram.com/wss_sut" target="_blank" class="px-2" style="text-decoration: none;"><img src="https://wss.ce.sharif.edu/media/7th/logos/Insta.png" border="0" width="26" height="25" style="width: 26px; height: 25px; max-width: 26px;border:none; outline:none; text-decoration:none;font-size:19px;font-family:URWGeometric,Helvetica Neue, Arial, sans-serif;color:#00aced;font-weight:bold" alt="   i"></a>
                <a href="https://www.linkedin.com/company/wss-sut" target="_blank" class="px-2" style="text-decoration: none;"><img src="https://wss.ce.sharif.edu/media/7th/logos/Linkedin.png" border="0" width="26" height="25" style="width: 26px; height: 25px; max-width: 26px;border:none; outline:none; text-decoration:none;font-size:19px;font-family:URWGeometric,Helvetica Neue, Arial, sans-serif;color:#00aced;font-weight:bold" alt="   i"></a>
                <a href="https://twitter.com/WSS_SUT" target="_blank" class="px-2" style="text-decoration: none;"><img src="https://wss.ce.sharif.edu/media/7th/logos/Twitter.png" border="0" width="26" height="25" style="width: 26px; height: 25px; max-width: 26px;border:none; outline:none; text-decoration:none;font-size:19px;font-family:URWGeometric,Helvetica Neue, Arial, sans-serif;color:#00aced;font-weight:bold" alt="   i"></a>
                <a href="https://www.facebook.com/events/774521109637429/" target="_blank" class="px-2" style="text-decoration: none;"><img src="https://wss.ce.sharif.edu/media/7th/logos/Facebook.png" border="0" width="26" height="25" style="width: 26px; height: 25px; max-width: 26px;border:none; outline:none; text-decoration:none;font-size:19px;font-family:URWGeometric,Helvetica Neue, Arial, sans-serif;color:#00aced;font-weight:bold" alt="   i"></a>
            </div>
        </div>
          </footer>
      </div>
  </body>
</html>
'''

BASE_HTML_CONTENT = RAW_BASE_HTML.format('''
<div class="px-1 py-1">
  {}
</div>
''')

PERSIAN_BASE_HTML_CONTENT = RAW_BASE_HTML.format('''
<div dir="rtl" class="px-1 py-1">
  {}
</div>
''')

PAYMENT_EMAIL = (
  "Dear {},<br>"
  "Thanks for your interest in attending 7th WSS <br>"
  "Your payment was successful. <br>"
  "Ref code: {} <br>"
)

RESET_PASSWORD_EMAIL = (
  "Dear attendee, <br>"
  "You've recently asked to reset your password. <br>"
  "To update your password, click <a href=\"{}\">here</a> <br>"
)

SURVEY_EMAIL = (
"با سلام و احترام <br>"
"شرکت‌کننده‌ی گرامی هفتمین سری سمینارهای زمستانه شریف، {} عزیز <br>"
"امیدوار هستیم که در 7th WSS توانسته باشیم لحظات خوبی را برایتان فراهم کرده و از شرکت در برنامه های این دوره از WSS خوشنود باشید. <br>"
"ویدئوهای تمامی ارائه‌های این رویداد ضبط شده و اگر از نظر ارائه دهنده مشکلی برای پخش وجود نداشته باشد در اسرع وقت در اختیارتان قرار خواهد گرفت. <br>"
"برای کمک به هرچه بهتر شدن رویداد در دوره‌های آینده می‌توانید فرم نظرسنجی زیر را پر کنید تا لینک ویدئو ها برایتان ارسال شود. <br>"
"توجه: حتی اگر در وبیناری شرکت نکرده اید لطف کنید این نظرسنجی را پر کنید تا از پیشنهادات و نظراتتان در تمام مراحل برگزاری رویداد مطلع باشیم. <br>"
" <br>"
"با آرزوی موفقیت <br>"
"تیم برگزاری هفتمین سری سمینارهای زمستانه‌ی دانشکده مهندسی کامپیوتر دانشگاه صنعتی شریف <br>"
)

STAFF_EMAIL = (
  "{} عزیز، با سلام"
  "از اینکه در آخرین لحظات رویداد با در اختیار گذاشتن ایمیل و اسمت بهمون کمک کردی، ممنونیم"
  "این ایمیل جهت تست کارکرد ایمیل‌های ارسالی به شرکت‌کننده‌ها برای شما ارسال شده است"
  "با سپاس فراوان، دبیر و تیم فنی سری سمینارهای زمستانه‌ی ۷ام"
)
