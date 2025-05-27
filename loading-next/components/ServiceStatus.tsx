import React, { useEffect, useState, useRef } from 'react';

type Props = {
  url: string;
  label: string;
  icon?: React.ReactNode;
  onStatusChange?: (isOnline: boolean) => void;
};

export default function ServiceStatus({ url, label, icon, onStatusChange }: Props) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>('loading');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 15;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let cancelled = false;
    let currentAttempts = 0;

    const checkStatus = () => {
      if (cancelled) return;
      if (status === 'ok') {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      if (currentAttempts >= maxAttempts) {
        setStatus('fail');
        if (onStatusChange) onStatusChange(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      fetch(url, { mode: 'no-cors', cache: 'no-cache' })
        .then(() => {
          setStatus('ok');
          if (onStatusChange) onStatusChange(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
        })
        .catch(() => {
          currentAttempts += 1;
          setAttempts(currentAttempts);
        });
    };

    // Direkt beim Mounten prüfen
    checkStatus();
    // Dann alle 10 Sekunden prüfen
    intervalRef.current = setInterval(() => {
      checkStatus();
    }, 10000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [url, maxAttempts, onStatusChange, status]);

  return (
    <div className="status-card transform transition-all duration-500 hover:translate-x-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <span className="font-medium text-lg">{label}</span>
        </div>
        <StatusIndicator status={status} />
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {status === 'loading' && `Connecting... (${attempts}/${maxAttempts})`}
        {status === 'ok' && 'Service is available and running'}
        {status === 'fail' && 'Could not connect to service'}
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: 'loading' | 'ok' | 'fail' }) {
  return (
    <div className="flex items-center gap-2">
      <div 
        className={`pulse-dot ${
          status === 'ok' 
            ? 'bg-black' 
            : status === 'fail' 
              ? 'bg-gray-900' 
              : 'bg-gray-600'
        }`}
      />
      <span className={`text-sm font-medium ${
        status === 'ok' 
          ? 'text-black' 
          : status === 'fail' 
            ? 'text-gray-700' 
            : 'text-gray-500'
      }`}>
        {status === 'ok' ? 'Online' : status === 'fail' ? 'Offline' : 'Checking'}
      </span>
    </div>
  );
} 