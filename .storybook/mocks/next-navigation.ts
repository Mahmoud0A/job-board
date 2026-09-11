/**
 * Minimal `next/navigation` stub for Storybook (plain webpack builder).
 * Components under test only need stable router values for rendering.
 */
export function useRouter() {
  return {
    push: () => undefined,
    replace: () => undefined,
    refresh: () => undefined,
    back: () => undefined,
    forward: () => undefined,
    prefetch: () => Promise.resolve(),
  };
}

export function usePathname(): string {
  return "/";
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function useParams(): Record<string, string> {
  return {};
}

export function redirect(): never {
  throw new Error("redirect() is not supported in Storybook");
}

export function permanentRedirect(): never {
  throw new Error("permanentRedirect() is not supported in Storybook");
}

export function notFound(): never {
  throw new Error("notFound() is not supported in Storybook");
}
