import { SERVICE_CONFIGS } from "@/config/services";
import { ServiceId } from "@/types/quote";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Step1Props {
  values: ServiceId[];
  onChange: (ids: ServiceId[]) => void;
}

export function Step1ServiceSelection({ values, onChange }: Step1Props) {
  const services = Object.values(SERVICE_CONFIGS);

  const toggleSelection = (id: ServiceId) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2 text-foreground">
          What do you need help with?
        </h2>
        <p className="text-muted-foreground text-lg">
          Select one or more services to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => {
          const isSelected = values.includes(service.id);
          return (
            <Card
              key={service.id}
              className={cn(
                "p-6 cursor-pointer transition-all hover:border-primary hover:shadow-md relative overflow-hidden group",
                isSelected
                  ? "border-primary ring-2 ring-primary bg-primary/5"
                  : "border-border",
              )}
              onClick={() => toggleSelection(service.id)}>
              <div className="flex flex-col items-center justify-center text-center space-y-3 relative z-10 min-h-[80px]">
                <span className="font-semibold text-lg">{service.name}</span>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 text-primary animate-in zoom-in duration-200">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              )}
              <div
                className={cn(
                  "absolute inset-0 bg-primary/5 transition-opacity duration-300",
                  isSelected
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100",
                )}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
