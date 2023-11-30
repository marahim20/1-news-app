import PromptForm from "@/components/promptForm";

export default function Home() {
  return (
    <main className="flex bg-red-400 min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl h-fit font-semibold tracking-wider">OneNews!</h1>
      <PromptForm />
    </main>
  );
}
