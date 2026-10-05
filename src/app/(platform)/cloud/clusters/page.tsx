import { getClusters } from "@/lib/data/cloud-data";
import ClustersClient from "@/components/cloud/clusters-client";

export const metadata = {
  title: "GPU Clusters | OpenSuperIntelligence",
  description: "Manage your dedicated AI compute infrastructure.",
};

export default async function ClustersPage() {
  const clusters = await getClusters();

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      <div className="mb-8 flex items-center text-sm text-[#86868B]">
        <span className="hover:text-foreground cursor-pointer transition-colors">Cloud</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">Clusters</span>
      </div>
      <ClustersClient clusters={clusters} />
    </div>
  );
}
