declare module '@/components/ui/*' {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
  export const Button: ComponentType<any>;
  export const Input: ComponentType<any>;
  export const Card: ComponentType<any>;
  export const CardContent: ComponentType<any>;
  export const CardDescription: ComponentType<any>;
  export const CardHeader: ComponentType<any>;
  export const CardTitle: ComponentType<any>;
  export const Label: ComponentType<any>;
  export const Alert: ComponentType<any>;
  export const AlertDescription: ComponentType<any>;
  export const Badge: ComponentType<any>;
  export const Select: ComponentType<any>;
  export const SelectContent: ComponentType<any>;
  export const SelectItem: ComponentType<any>;
  export const SelectTrigger: ComponentType<any>;
  export const SelectValue: ComponentType<any>;
} 