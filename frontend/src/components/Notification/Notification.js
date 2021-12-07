import React, { useState } from "react";
import { Alert } from "reactstrap";

import infoIcon from "../../assets/notificationsIcons/infoIcon.svg";
import warningIcon from "../../assets/notificationsIcons/warningIcon.svg";
import successIcon from "../../assets/notificationsIcons/successIcon.svg";
import dangerIcon from "../../assets/notificationsIcons/dangerIcon.svg";

import s from "./Notification.module.scss";

const typesIcons = {
  info: infoIcon,
  warning: warningIcon,
  success: successIcon,
  error: dangerIcon,
}

const colors = {
  info: "#00A5FF",
  warning: "#FFA100",
  success: "#43BC13",
  error: "#FF4B23",
}

export default function Notification({ ...props }) {

  const [notificationOpen, setNotificationClose] = useState(true)

  const icon = getIconByType(props.type)

  const closeNotification = () => {
    setNotificationClose(!notificationOpen)
  }

  return (
    <>
      <Alert
        className={s.notificationContainer}
        style={{backgroundColor: colors[props.type]}}
        isOpen={notificationOpen}
        toggle={() => closeNotification()}
      >
        <div className={s.notificationIconContainer}>
          {props.withIcon && <img src={icon} alt="..."/>}
        </div>
        <div className={s.messageContainer}>
          <span dangerouslySetInnerHTML={{__html: props.msg}}></span>
        </div>
      </Alert>
    </>
  )
};

function getIconByType(type = "info") {
  return typesIcons[type];
}

