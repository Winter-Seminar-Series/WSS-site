'use client';

import { Copy } from 'lucide-react';

import { toast } from '@/lib/toast';
import { Button } from '@/ui/Button';

interface Props {
  value: string;
  label: string;
}

export function CopyButton({ value, label }: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied to clipboard.');
    } catch {
      toast.error('Could not copy — please copy it manually.');
    }
  };

  return (
    <Button size="sm" onClick={copy}>
      <Copy className="size-4" aria-hidden />
      {label}
    </Button>
  );
}
