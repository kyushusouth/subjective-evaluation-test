"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

export default function SubmitButton({ children }: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={pending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Button variant="contained" type="submit" disabled={pending}>
          {children}
        </Button>
      )}
    </div>
  );
}
