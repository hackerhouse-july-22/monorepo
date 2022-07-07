import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
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
  console.log(router);
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick && onClick(e);
        router.push(href);
      }}
      {...(router.asPath.indexOf(href) === 0 ? activeProps : {})}
    />
  );
};

export default LinkButton;
