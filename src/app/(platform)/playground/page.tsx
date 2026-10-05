import { ChatInterface } from "@/components/inference/chat-interface";

export default async function PlaygroundPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  const { model } = await searchParams;

  return (
    <div className="h-full">
      <ChatInterface initialModel={model || "deepseek-v4-pro"} />
    </div>
  );
}
