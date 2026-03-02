import { ServiceId } from "@/types/quote";
import { SERVICE_CONFIGS, FieldDefinition } from "@/config/services";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Step2Props {
  serviceIds: ServiceId[];
  data: Record<string, Record<string, any>>; // { [serviceId]: { [fieldId]: value } }
  onChange: (serviceId: string, fieldId: string, value: any) => void;
}

export function Step2ServiceDetails({
  serviceIds,
  data,
  onChange,
}: Step2Props) {
  if (!serviceIds || serviceIds.length === 0) return null;

  const validConfigs = serviceIds
    .map((id) => SERVICE_CONFIGS[id])
    .filter((config) => config && config.fields.length > 0);

  const renderField = (serviceId: string, field: FieldDefinition) => {
    // Defaults to empty string if not yet initialized
    const value = data[serviceId]?.[field.id] ?? "";

    switch (field.type) {
      case "button-group":
        return (
          <div className="flex flex-wrap gap-3">
            {field.options?.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex-1 min-w-[60px] sm:flex-none",
                  value === opt.value
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted",
                )}
                onClick={() => onChange(serviceId, field.id, opt.value)}>
                {opt.label}
              </button>
            ))}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={String(value)}
            onValueChange={(val) => onChange(serviceId, field.id, val)}
            className="flex flex-col space-y-3">
            {field.options?.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                  String(value) === String(opt.value)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                )}
                onClick={() =>
                  onChange(serviceId, field.id, String(opt.value))
                }>
                <RadioGroupItem
                  value={String(opt.value)}
                  id={`${serviceId}-${field.id}-${opt.value}`}
                />
                <Label
                  htmlFor={`${serviceId}-${field.id}-${opt.value}`}
                  className="flex-1 cursor-pointer font-medium text-base">
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "select":
        return (
          <Select
            value={String(value)}
            onValueChange={(val) => onChange(serviceId, field.id, val)}>
            <SelectTrigger className="w-full text-base py-6 rounded-xl border-2 hover:border-primary/50 transition-colors">
              <SelectValue
                placeholder={field.placeholder || "Select an option..."}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={String(opt.value)}
                  className="py-3 text-base cursor-pointer">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="h-12 w-12 rounded-xl border-2 hover:border-primary/50"
              onClick={() => {
                const current = Number(value) || 0;
                if (current > 0) onChange(serviceId, field.id, current - 1);
              }}>
              <Minus className="h-5 w-5" />
            </Button>
            <div className="w-16 text-center text-xl font-semibold">
              {value || 0}
            </div>
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="h-12 w-12 rounded-xl border-2 hover:border-primary/50"
              onClick={() => {
                const current = Number(value) || 0;
                onChange(serviceId, field.id, current + 1);
              }}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        );

      case "text":
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(serviceId, field.id, e.target.value)}
            placeholder={field.placeholder}
            className="text-base py-6 rounded-xl border-2 focus-visible:ring-1 hover:border-primary/50 transition-colors"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2 text-foreground">
          Tell us about your space
        </h2>
        <p className="text-muted-foreground text-lg">
          Please provide details for the services you selected.
        </p>
      </div>

      {validConfigs.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border-2 border-dashed">
          <p className="text-lg text-muted-foreground font-medium">
            No extra details required. You can proceed to the next step.
          </p>
        </div>
      ) : (
        <div className="space-y-12 max-w-2xl mx-auto">
          {validConfigs.map((config, groupIdx) => (
            <div
              key={config.id}
              className="space-y-8 animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${groupIdx * 150}ms`,
                animationFillMode: "both",
              }}>
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-primary">
                  {config.name} Details
                </h3>
              </div>

              {config.fields.map((field) => {
                // Determine if we should optionally hide some fields based on other answers
                const parentVal = data[config.id]?.additionalServices;
                if (
                  ["balcony", "blinds", "curtains"].includes(field.id) &&
                  parentVal !== "yes"
                ) {
                  return null;
                }

                return (
                  <div
                    key={field.id}
                    className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </Label>
                    {renderField(config.id, field)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
