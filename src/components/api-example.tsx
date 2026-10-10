"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle, Radio } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ApiExample() {
  const [message, setMessage] = useState("Your server response will appear here.");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function checkConnection() {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch("/api/message", {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error("The request failed.");

      const data: unknown = await response.json();
      if (
        typeof data !== "object" ||
        data === null ||
        !("message" in data) ||
        typeof data.message !== "string"
      ) {
        throw new Error("The response has no message.");
      }
      setMessage(data.message);
    } catch {
      setHasError(true);
      setMessage("Could not reach the API. Check that your server is running and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="gap-6 p-2">
      <CardHeader className="pt-4">
        <Radio className="mb-3 size-5 text-primary" aria-hidden="true" />
        <CardTitle><h2>Try the connection</h2></CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pb-4">
        <p className="leading-6 text-muted-foreground">
          A small example of your interface talking to your API. Click below to
          request a message from the server.
        </p>
        <p role="status" aria-live="polite" className={`min-h-12 rounded-lg border bg-muted/60 p-3 text-xs leading-5 ${hasError ? "text-destructive" : "text-muted-foreground"}`}>
          {isLoading ? "Requesting a message…" : message}
        </p>
        <Button type="button" onClick={checkConnection} disabled={isLoading} className="h-10 px-4">
          {isLoading ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
          {isLoading ? "Connecting…" : "Check connection"}
        </Button>
      </CardContent>
    </Card>
  );
}
