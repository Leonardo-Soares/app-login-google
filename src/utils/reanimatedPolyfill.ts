/**
 * Polyfill para useAnimatedGestureHandler
 * Adiciona a função ao módulo react-native-reanimated para compatibilidade
 * com @react-navigation/drawer que ainda usa a API antiga do Reanimated v2
 * 
 * Este polyfill é necessário porque Reanimated v4 removeu useAnimatedGestureHandler
 */
import * as Reanimated from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

type GestureHandlerContext<T extends Record<string, unknown>> = T;

type GestureHandlerEvent<T = any> = {
  translationX: number;
  translationY: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
  state: number;
};

type GestureHandlerCallbacks<T extends GestureHandlerContext<Record<string, unknown>>> = {
  onStart?: (event: GestureHandlerEvent, context: T) => void;
  onActive?: (event: GestureHandlerEvent, context: T) => void;
  onEnd?: (event: GestureHandlerEvent, context: T) => void;
  onFinish?: (event: GestureHandlerEvent, context: T) => void;
  onCancel?: (event: GestureHandlerEvent, context: T) => void;
  onFail?: (event: GestureHandlerEvent, context: T) => void;
};

function useAnimatedGestureHandler<
  T extends GestureHandlerContext<Record<string, unknown>> = Record<string, unknown>
>(
  handlers: GestureHandlerCallbacks<T>
) {
  // Create a context that persists across gesture events
  const context = useSharedValue<T>({} as T);
  
  // Return a worklet function directly
  // This function will be called by gesture handlers
  const handler = (event: any) => {
    'worklet';
    
    const gestureEvent: GestureHandlerEvent = {
      translationX: event?.translationX || 0,
      translationY: event?.translationY || 0,
      velocityX: event?.velocityX || 0,
      velocityY: event?.velocityY || 0,
      x: event?.x || 0,
      y: event?.y || 0,
      state: event?.state || 0,
    };

    // Map gesture handler states
    // State 2 = BEGAN, State 4 = ACTIVE, State 5 = END, State 3 = CANCELLED
    if (gestureEvent.state === 2 && handlers.onStart) {
      handlers.onStart(gestureEvent, context.value);
    } else if (gestureEvent.state === 4 && handlers.onActive) {
      handlers.onActive(gestureEvent, context.value);
    } else if (gestureEvent.state === 5) {
      if (handlers.onEnd) {
        handlers.onEnd(gestureEvent, context.value);
      }
      if (handlers.onFinish) {
        handlers.onFinish(gestureEvent, context.value);
      }
    } else if (gestureEvent.state === 3) {
      if (handlers.onCancel) {
        handlers.onCancel(gestureEvent, context.value);
      }
    } else if (gestureEvent.state === 1 && handlers.onFail) {
      handlers.onFail(gestureEvent, context.value);
    }
  };

  return handler;
}

// Adiciona a função ao módulo Reanimated se não existir
if (!(Reanimated as any).useAnimatedGestureHandler) {
  (Reanimated as any).useAnimatedGestureHandler = useAnimatedGestureHandler;
}

export {};

