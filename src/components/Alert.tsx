import { useEffect, useContext } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CircleX } from "lucide-react";
import { AlertContext } from "@/lib/AlertContext";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

export const AlertComponent = () => {
  const {
    state: { show, type_, message, progress },
    dispatch,
  } = useContext(AlertContext);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "SET_PROGRESS", payload: progress - 2 });
    }, 100);

    return () => clearInterval(interval);
  }, [progress, dispatch]);

  useEffect(() => {
    if (progress === 0) {
      dispatch({ type: "HIDE_ALERT" });
    }
  }, [progress, dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 flex items-center justify-center w-screen z-50"
        initial={{ y: -100 }}
        animate={{ y: show ? 0 : -200 }}
        transition={{ duration: 0.3 }}
        exit={{ y: -200 }}
      >
        <Alert className="max-w-lg shadow-lg p-0" variant={type_}>
          <Button
            className={cn(
              type_ === "success" ? "hover:bg-success/10" : "hover:bg-error/10",
              "absolute top-0 right-0"
            )}
            variant="ghost"
            onClick={() => dispatch({ type: "HIDE_ALERT" })}
          >
            <CircleX className="w-4 h-4" />
          </Button>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="m-4">
            {type_.charAt(0).toUpperCase() + type_.slice(1)}
          </AlertTitle>
          <AlertDescription className="m-4">{message}</AlertDescription>
          <Progress value={progress} className="w-full" variant={type_} />
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};
