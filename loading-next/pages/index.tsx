import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import ServiceStatus from '../components/ServiceStatus';
import { useRouter } from 'next/router';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [date, setDate] = useState('');
  const [allServicesReady, setAllServicesReady] = useState(false);
  const [serviceStates, setServiceStates] = useState({
    keycloak: false,
    backend: false,
    frontend: false
  });
  const router = useRouter();

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Set date after mount to avoid hydration errors
  useEffect(() => {
    setDate(new Date().toLocaleString());
    const timeInterval = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  // Check if all services are ready
  useEffect(() => {
    if (serviceStates.keycloak && serviceStates.backend && serviceStates.frontend) {
      setAllServicesReady(true);
    } else {
      setAllServicesReady(false);
    }
  }, [serviceStates]);

  // Service status update handler
  const handleServiceStatusChange = (service: 'keycloak' | 'backend' | 'frontend', isOnline: boolean) => {
    setServiceStates(prev => ({
      ...prev,
      [service]: isOnline
    }));
  };

  const handleGoToApp = () => {
    window.location.href = 'http://localhost:4200';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-white text-gray-900">
      <Head>
        <title>CazinoMate | Service Status</title>
        <meta name="description" content="CasinoMate service status dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <div className="text-center mb-16 relative">
          <h1 className="text-6xl font-bold mb-2 text-black transition-all duration-700 hover:scale-105">
            Casino<span className="text-gray-700">Mate</span>
          </h1>
          <div className="mt-4 flex space-x-3 justify-center">
            <span className="px-3 py-1 text-sm bg-black text-white rounded-full transition-transform duration-300 hover:scale-110">
              Service Status
            </span>
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full border border-gray-200 transition-transform duration-300 hover:scale-110">
              {date}
            </span>
          </div>
          {allServicesReady && (
            <div className="absolute -top-10 right-0 animate-bounce">
              <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
                All services are ready!
              </div>
            </div>
          )}
        </div>

        <div className="w-full space-y-6 mb-10 transition-all duration-500">
          <ServiceStatus 
            url="http://localhost:9090" 
            label="Keycloak (Authentication)"
            onStatusChange={(isOnline) => handleServiceStatusChange('keycloak', isOnline)}
          />
          <ServiceStatus 
            url="http://localhost:8080/api/health" 
            label="Backend API"
            onStatusChange={(isOnline) => handleServiceStatusChange('backend', isOnline)}
          />
          <ServiceStatus 
            url="http://localhost:4200" 
            label="Frontend App"
            onStatusChange={(isOnline) => handleServiceStatusChange('frontend', isOnline)}
          />
        </div>

        {allServicesReady && (
          <button
            className="mb-8 px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition-colors duration-200 text-lg font-semibold"
            onClick={handleGoToApp}
          >
            Go to App
          </button>
        )}

        <div className="mt-10 relative transition-all duration-500 hover:scale-110">
          <div className={`w-16 h-1 bg-black rounded-full mx-auto mb-2 transition-transform duration-1000 ${isAnimating ? 'scale-x-100' : 'scale-x-50'}`}></div>
          <div className={`w-32 h-1 bg-gray-700 rounded-full mx-auto mb-2 transition-transform duration-1000 ${isAnimating ? 'scale-x-75' : 'scale-x-100'}`}></div>
          <div className={`w-24 h-1 bg-gray-400 rounded-full mx-auto transition-transform duration-1000 ${isAnimating ? 'scale-x-50' : 'scale-x-75'}`}></div>
        </div>
        
        <div className="text-sm text-gray-500 mt-12 text-center">
          <p className="animate-pulse">
            {allServicesReady 
              ? "All services are ready!" 
              : "Waiting for all services to become available..."}
          </p>
          {!allServicesReady && (
            <p className="mt-3 text-xs group">
              If services fail to load, try restarting with 
              <code className="mx-1 px-2 py-0.5 bg-black text-white rounded group-hover:bg-gray-800 transition-colors duration-300">make stop</code> 
              and 
              <code className="mx-1 px-2 py-0.5 bg-black text-white rounded group-hover:bg-gray-800 transition-colors duration-300">make start</code>
            </p>
          )}
        </div>
      </main>
    </div>
  );
} 