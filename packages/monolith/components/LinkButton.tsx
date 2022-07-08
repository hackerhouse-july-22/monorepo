import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

type LinkButtonProps = {
  activeProps?: ButtonProps;
  href: string;
} & ButtonProps;

const LinkButton: React.FC<LinkButtonProps> = ({
  activeProps,
  onClick,
  href,
  ...props
}) => {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick && onClick(e);
        router.push(href);
      }}
      {...(router.asPath === href ? activeProps : {})}
    />
  );
};

export default LinkButton;
