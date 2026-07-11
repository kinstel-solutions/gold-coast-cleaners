"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { requestCallback } from "@/app/actions";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { sendGTMEvent } from "@next/third-parties/google";

type CallbackDialogProps = {
  trigger: React.ReactNode;
  placement?: string;
};

export function CallbackDialog({ trigger, placement }: CallbackDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number so we can reach you.",
        variant: "destructive",
      });
      return;
    }

    setIsPending(true);
    try {
      const res = await requestCallback({
        name,
        phone,
        message,
        sourcePage: pathname,
        placement: placement || "callback_modal",
      });

      if (res.success) {
        setIsSuccess(true);
        sendGTMEvent({
          event: "callback_request_submitted",
          placement: placement || "callback_modal",
          journey_string: pathname,
        });
        toast({
          title: "Callback Request Sent",
          description: "We'll call you back as soon as possible!",
        });
        // Reset form after delay
        setTimeout(() => {
          setIsOpen(false);
          // Wait for dialog close animation
          setTimeout(() => {
            setName("");
            setPhone("");
            setMessage("");
            setIsSuccess(false);
          }, 300);
        }, 2000);
      } else {
        toast({
          title: "Submission failed",
          description: res.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description: "Failed to send callback request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Request a Callback</DialogTitle>
          <DialogDescription>
            Enter your details below, and one of our team members will call you back shortly.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900">Request Received!</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Thank you! We have received your request and will call you back shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="callback-name">Your Name</Label>
              <Input
                id="callback-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-slate-200 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-phone" className="flex items-center gap-1">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="callback-phone"
                type="tel"
                placeholder="e.g. 0412 345 678"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border-slate-200 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-message">Best time to call (Optional)</Label>
              <Input
                id="callback-message"
                placeholder="e.g., Today at 2 PM, or ASAP"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-xl border-slate-200 focus-visible:ring-primary"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white py-6 text-base font-semibold shadow-lg transition-all active:scale-98"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-5 w-5" />
                  Request Callback
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
