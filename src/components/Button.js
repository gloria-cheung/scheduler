import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   const {onClick, disabled, children} = props;

   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button onClick={onClick} className={buttonClass} disabled={disabled}>
         {children}
      </button>
   );
}
