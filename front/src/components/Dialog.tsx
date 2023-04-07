import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({
  open,

  handleClose,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Terms of services'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ul>
              <li>
                Participants may NOT record or broadcast audio/video of WSS.
              </li>
              <li>
                WSS is committed to data privacy and protecting your personal
                information. Information on how WSS collects, processes, and
                uses your data is included in the WSS Privacy Policy which is
                hereby incorporated into these Terms & Conditions. Additionally,
                by submitting your email address during the event registration
                process, you agree that WSS and its event partners may send you
                event-related information. A valid email address is required for
                all registrations.
              </li>
              <li>
                WSS uses the personal data you provide in this registration for
                administering your participation in this event. This may include
                information about the event’s content, event logistics, payment,
                updates, and additional information related to the event.
              </li>
              <li>
                WSS uses (and, perhaps shares) your personal information for the
                following purposes:
                <ul>
                  <li>To provide support or other services.</li>
                  <li>
                    To provide information based on your needs and respond to
                    your requests.
                  </li>
                  <li>To provide online forums and social networks.</li>
                  <li>
                    To select content, improve quality, and facilitate use of
                    the websites. To serve personalized advertising to you.
                  </li>
                  <li>
                    To communicate with you about a meeting, conference, or
                    event.
                  </li>
                  <li>To document standards development participation</li>
                  <li>To assist in your participation in WSS activities.</li>
                  <li>
                    To update you on relevant WSS benefits, programs, and
                    opportunities.
                  </li>
                  <li>To engage with third parties.</li>
                  <li>To protect WSS content and services.</li>
                  <li>
                    To get feedback or input from you. To protect WSS
                    information assets as well as your own personal data.
                  </li>
                </ul>
              </li>
              <li>
                Payments made are not refundable for any reason, including, but
                not limited to, failure to use conference attendance credentials
                due to illness or due to any event beyond the reasonable control
                of the parties, such as an act of God, natural disaster,
                travel-related problems or an act of terrorism.
              </li>
              <li>
                WSS prohibits discrimination, harassment, and bullying against
                any person for any reason—for example, because of age, ancestry,
                color, disability or handicap, national origin, race, religion,
                gender, sexual or affectional orientation, gender identity,
                appearance, matriculation, political affiliation, marital
                status, veteran status, or any other characteristic protected by
                law.
              </li>
              <li>
                To comply with global data privacy laws, WSS imposes certain
                restrictions on the use of multimedia at it's events (e.g.
                photography, video, audio, online streaming, and all future
                mediums). An attendee is permitted to use hand-held cameras
                and/or smart phones to take photographs and capture digital
                images for personal, non-commercial use, provided the
                photography is not disruptive. Photographs may not be published,
                sold, reproduced, transmitted, distributed or otherwise
                commercially exploited in any manner whatsoever.
              </li>
              <li>
                The views expressed by any event attendee, speaker, exhibitor,
                or sponsor are not necessarily those of WSS. All attendees,
                speakers, exhibitors, and sponsors are solely responsible for
                the content of all individual or corporation presentations,
                marketing collateral, and/or advertising
              </li>
              <li>
                WSS reserves the right to change, amend, add or remove any of
                the above Terms & Conditions in its sole discretion and without
                prior notice. If one or more of the conditions outlined in these
                Terms & Conditions should become invalid, the remaining
                conditions will continue to be valid and apply. These Terms &
                Conditions apply to all event participants (attendees, speakers,
                sponsors, exhibitors).
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
