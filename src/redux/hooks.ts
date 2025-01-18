// src/hooks.ts
import { useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useDispatchw = () => useDispatch<AppDispatch>();
export const useSelectorw: TypedUseSelectorHook<RootState> = useSelector;

export const useLogger = (name: string) => {
    if(true) {
        return;
      }
      
  const renderCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Increment render count on each render
  renderCount.current += 1;

  useEffect(() => {
    console.log(`${name} rendered ${renderCount.current} times`);

    // Start the timer to log render count every 30 seconds
    if (!timer.current) {
      timer.current = setInterval(() => {
        console.log(
          ` [${renderCount.current}]: [${name}]`
        );
        // Reset render count after logging
        renderCount.current = 0;
      }, 5000);
    }

    // Clean up timer on component unmount
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [name]);

  // Optional: You can return the render count or other info if needed
}