import {
  ReactNode,
  createContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";

type SpringType = typeof import("@react-spring/web");
type GestureType = typeof import("@use-gesture/react");

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoading?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

const getAsyncAnimationModules = async () => {
  return Promise.all([
    import("@react-spring/web"),
    import("@use-gesture/react"),
  ]);
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoading(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoading,
    }),
    [isLoading],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
