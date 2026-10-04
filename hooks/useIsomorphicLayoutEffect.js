import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect warns on the server, so use a no-op during SSR
 * and the real hook on the client. Combined with dynamic imports
 * (ssr: false) for GSAP-heavy components this keeps Next.js happy.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
