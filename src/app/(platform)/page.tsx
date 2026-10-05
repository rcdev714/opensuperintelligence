import { redirect } from "next/navigation";

// The platform root redirects to the main console view.
// This avoids a client-reference-manifest webpack issue in Next.js 16
// when a Server Component at a route group root renders Client Components.
export default function PlatformRootPage() {
  redirect("/cloud");
}
