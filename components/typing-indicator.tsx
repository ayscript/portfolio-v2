export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg rounded-bl-none px-3 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center h-full">
          <div
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDuration: "1s", animationDelay: "0ms" }}
          />
          <div
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDuration: "1s", animationDelay: "150ms" }}
          />
          <div
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDuration: "1s", animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}