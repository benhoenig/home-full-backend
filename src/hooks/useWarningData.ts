
import { useState } from 'react';

export type Warning = {
  name: string;
  project: string;
  phone: string;
  type: string;
  details: string;
};

export function useWarningData() {
  // Sample warning data
  const [data] = useState<Warning[]>([
    { name: "Alex Wong", project: "Downtown Lofts", phone: "555-111-2222", type: "Follow-up", details: "..." },
    { name: "Sarah Chen", project: "Parkview Heights", phone: "555-333-4444", type: "Payment", details: "..." },
  ]);

  return data;
}
