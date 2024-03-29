import React, { ButtonHTMLAttributes, memo, MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss";
import combineClassNames from "@/utils/combineClassNames";
import CommonLink from "../CommonLink";
import { UrlObject } from "url";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "link";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "transparent";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean;
  xsFullWidth?: boolean; // will be full width on mobile only
  icon?: ReactNode;
  xsFixedOnBottom?: boolean;
  url?: UrlObject | string;
}

/**
 * This component is a wrapper for the button element.
 * It will render a button with the given props.
 * It can be also used as a link/ NextLink by passing the url prop.
 * @param props {ButtonProps}
 * @returns {JSX.Element}
 * @constructor Button
 * @example
 * <Button
 *  variant="contained"
 *  color="primary"
 *  size="medium"
 *  disabled={false}
 *  fullWidth={false}
 *  onClick={() => {}}
 *  className="my-class"
 *  icon={<Icon />}
 * >
 *  My Button
 * </Button>
 */
function Button({
  size = "medium",
  variant = "contained",
  color = "primary",
  disabled,
  children,
  fullWidth = false,
  onClick,
  className,
  xsFullWidth = false,
  xsFixedOnBottom = false,
  icon,
  url,
}: ButtonProps) {
  const renderButton = () => (
    <button
      className={combineClassNames(
        styles,
        {
          container: true,
          disabled: Boolean(disabled),
          // focused: true,
          [size]: true,
          [`${color}Btn`]: true,
          [variant]: true,
          fullWidth,
          xsFullWidth,
          xsFixedOnBottom,
        },
        className
      )}
      disabled={disabled}
      onClick={!disabled ? onClick : () => {}}
    >
      <>
        {icon && <span className={styles.icon}> {icon} </span>}
        {children}
      </>
    </button>
  );

  return url ? (
    <CommonLink preventUnderLine href={url}>
      {renderButton()}
    </CommonLink>
  ) : (
    renderButton()
  );
}

export default memo(Button);
