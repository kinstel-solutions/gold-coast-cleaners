import { ServiceId } from "@/types/quote";
import { SERVICE_CONFIGS, AddOnDefinition } from "@/config/services";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface Step3Props {
  serviceIds: ServiceId[];
  selectedAddOns: string[];
  onChange: (addOns: string[]) => void;
}

export function Step3AddOns({
  serviceIds,
  selectedAddOns,
  onChange,
}: Step3Props) {
  if (!serviceIds || serviceIds.length === 0) return null;

  // Aggregate and deduplicate allowed add-ons from all selected services
  const allowedAddOns = Array.from(
    new Map(
      serviceIds
        .map((id) => SERVICE_CONFIGS[id])
        .filter(Boolean)
        .flatMap((config) => config.allowedAddOns)
        .map((addOn) => [addOn.id, addOn] as [string, AddOnDefinition]),
    ).values(),
  );

  const handleToggle = (id: string) => {
    if (selectedAddOns.includes(id)) {
      onChange(selectedAddOns.filter((a) => a !== id));
    } else {
      onChange([...selectedAddOns, id]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2 text-foreground">
          Need any extras?
        </h2>
        <p className="text-muted-foreground text-lg">
          Select any optional add-ons to enhance your service.
        </p>
      </div>

      {allowedAddOns.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border-2 border-dashed">
          <p className="text-lg text-muted-foreground font-medium">
            No additional add-ons available for the selected services.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {allowedAddOns.map((addOn, idx) => {
            const isSelected = selectedAddOns.includes(addOn.id);
            return (
              <Card
                key={addOn.id}
                className={cn(
                  "p-5 cursor-pointer transition-all hover:border-primary hover:shadow-md",
                  isSelected
                    ? "border-primary ring-2 ring-primary bg-primary/5"
                    : "border-border",
                  "animate-in fade-in slide-in-from-bottom-4",
                )}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: "both",
                }}
                onClick={() => handleToggle(addOn.id)}>
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleToggle(addOn.id)}
                    className="mt-1 h-5 w-5"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg leading-none">
                      {addOn.label}
                    </h3>
                    {addOn.description && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                        <Info className="h-4 w-4" /> {addOn.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
