import React from "react";
import { Popover } from "react-bootstrap";

const CustomPopover = ({ placement, title, content }) => {
  return (
    <div>
      <Popover id={`popover-positioned-${placement}`}>
        <Popover.Title as="h3">{` ${title}`}</Popover.Title>
        <Popover.Content>
          {content}
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default CustomPopover;
