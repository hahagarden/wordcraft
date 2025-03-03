/**
 * @param customClassName - size 필수. ex) w-4 h-4
 */
export default function Spinner({ customClassName = "" }: { customClassName: string }) {
  return (
    <div className="inline-block">
      <div className={`${customClassName} rounded-full border-2 border-t-background animate-spin`}></div>
    </div>
  );
}
