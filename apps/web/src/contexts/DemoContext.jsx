
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DemoService from '@/lib/DemoService';

const DemoContext = createContext();

export function useDemoContext() {
  return useContext(DemoContext);
}

export function DemoProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [demoType, setDemoType] = useState(null); // 'admin' or 'end-user'
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(10);
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    DemoService.initializeDemoData();
  }, []);

  const startDemo = (type) => {
    setDemoType(type);
    setIsActive(true);
    setCurrentStep(1);
    
    if (type === 'admin') {
      setSteps(DemoService.getAdminDemoSteps());
      setTotalSteps(10);
      navigate('/admin-demo');
    } else {
      setSteps(DemoService.getEndUserDemoSteps());
      setTotalSteps(10);
      navigate('/end-user-demo');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      exitDemo();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const exitDemo = () => {
    setIsActive(false);
    setDemoType(null);
    setCurrentStep(1);
    navigate('/admin');
  };

  const resetDemo = () => {
    setCurrentStep(1);
  };

  const value = {
    isActive,
    demoType,
    currentStep,
    totalSteps,
    steps,
    startDemo,
    nextStep,
    previousStep,
    exitDemo,
    resetDemo
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}
