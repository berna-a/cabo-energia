import { cn } from '@/lib/utils';
import { useCommercialCopy } from '@/lib/commercialCopy';
export function LigarCaboLabel({className,tone='light'}:{className?:string;tone?:'light'|'dark'}) {
  const c=useCommercialCopy();
  return <span className={cn('relative z-10 text-center leading-tight',tone==='dark'?'text-brand-green-deep':'text-white',className)}>{c.cta}</span>;
}
