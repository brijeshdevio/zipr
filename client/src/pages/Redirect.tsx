import { api } from "@/api/axios";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>();

  useEffect(() => {
    window.location.assign(
      `${api.defaults.baseURL}/links/redirect/${shortCode}`
    );
  }, [shortCode]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto">
        <Spinner className="size-8 animate-spin" />
      </div>
    </div>
  );
}
