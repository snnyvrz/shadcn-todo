import { useEffect, useState, useContext } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CircleX } from "lucide-react";
import { AlertContext } from "@/lib/AlertContext";

export const AlertComponent = () => {
  const {
    state: { show, type_, message },
    dispatch,
  } = useContext(AlertContext);

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 2);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 0) {
      dispatch({ type: "HIDE_ALERT" });
      setProgress(100);
    }
  }, [progress, dispatch]);

  return (
    <div className="fixed top-4 flex items-center justify-center w-screen z-50">
      <Alert className="max-w-lg shadow-lg p-0" hidden={!show} variant={type_}>
        <Button
          className={`absolute top-0 right-0 hover:bg-${type_}`}
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
    </div>
  );
};
