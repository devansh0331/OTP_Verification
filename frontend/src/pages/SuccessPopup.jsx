import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import success from "../assets/success.png";

export function SuccessPopup(props) {
  return (
    <Dialog
      open={props.open}
      //   handler={props.handleOpen}
      className="bg-customgray-dark rounded-md "
    >
      {/* <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          Your Attention is Required!
        </Typography>
      </DialogHeader> */}
      <DialogBody className="grid place-items-center gap-1">
        <img src={success} alt="" className="h-auto " />
        <Typography color="green" variant="h4">
          Congratulations!
        </Typography>
        <Typography className="text-center font-normal">
          Your OTP is successfully verified.
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="gradient" color="gray" onClick={props.handleHome}>
          Home
        </Button>
        <Button
          variant="gradient"
          color="red"
          className="bg-red"
          onClick={props.handleReadDocs}
        >
          Read Docs
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
